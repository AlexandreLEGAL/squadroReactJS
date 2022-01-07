import react, {useState} from 'react';

import { createStage, checkPlayerCollision, checkPawnCollision } from '../gameHelpers';
//Components
import Stage from './Stage';
import Display from './Display';
import Start from './Start';
//Styled componnents
import { StyledSquadro, StyledSquadroWrapper } from './styles/StyledSquadro';

//Custom Hooks

// import {usePlayer} from './hook/usePlayer';
import {useStage} from './hook/useStage';
import { usePawn } from './hook/usePawn';

const Squadro = () => {
    const [turnTime, setTurnTime] = useState(null)
    const [gameOver, setGameOver] = useState(false)

    // const [player, updatePlayerPos, resetPlayer] = usePlayer()

    const [pawn,    updatePawnPos,      resetPawn,      goBack]    = usePawn({color:"B"}, {number:1}) // Couleur, numero
    const [pawn1,   updatePawnPos1,     resetPawn1,     goBack1]   = usePawn({color:"B"}, {number:2})
    const [pawn2,   updatePawnPos2,     resetPawn2,     goBack2]   = usePawn({color:"B"}, {number:3})
    const [pawn3,   updatePawnPos3,     resetPawn3,     goBack3]   = usePawn({color:"B"}, {number:4})
    const [pawn4,   updatePawnPos4,     resetPawn4,     goBack4]   = usePawn({color:"B"}, {number:5})
    
    const [pawn5,   updatePawnPos5,     resetPawn5,     goBack5]   = usePawn({color:"W"}, {number:1})
    const [pawn6,   updatePawnPos6,     resetPawn6,     goBack6]   = usePawn({color:"W"}, {number:2})
    const [pawn7,   updatePawnPos7,     resetPawn7,     goBack7]   = usePawn({color:"W"}, {number:3})
    const [pawn8,   updatePawnPos8,     resetPawn8,     goBack8]   = usePawn({color:"W"}, {number:4})
    const [pawn9,   updatePawnPos9,     resetPawn9,     goBack9]   = usePawn({color:"W"}, {number:5})
    
    const pawnPlayer1 = [].concat(
        [[pawn, updatePawnPos, resetPawn,       goBack]],
        [[pawn1, updatePawnPos1, resetPawn1,    goBack1]],
        [[pawn2, updatePawnPos2, resetPawn2,    goBack2]],
        [[pawn3, updatePawnPos3, resetPawn3,    goBack3]],
        [[pawn4, updatePawnPos4, resetPawn4,    goBack4]],

        [[pawn5, updatePawnPos5, resetPawn5,    goBack5]],
        [[pawn6, updatePawnPos6, resetPawn6,    goBack6]],
        [[pawn7, updatePawnPos7, resetPawn7,    goBack7]],
        [[pawn8, updatePawnPos8, resetPawn8,    goBack8]],
        [[pawn9, updatePawnPos9, resetPawn9,    goBack9]],
        
        )
    const [stage, setStage] = useStage(
        // player,
        pawnPlayer1,
         createStage(), )
    console.log('re-render')

    // const movePlayer = dir => {
    //     if(!checkPlayerCollision(player, stage, {x:dir, y:0})){
    //         updatePlayerPos({x: dir, y:0})
    //     }
    // }

    // const moveVerticaly = dir => {
    //     if(!checkPlayerCollision(player, stage, {x:0, y:dir})){
    //         updatePlayerPos({x: 0, y:dir})
    //     }
    // }
    const bestStepPossible = (h, step, p, stage) => {
        let i = step // Nombre de pas max possible
        let possible = false // Pas de collision ?
        let mv = {x: 0, y: 0}
        while(i!==0 && !possible){ // On détermine le mouvement le plus grand possible
            if(Math.sign(step) === 1){ // - si aller + si retour
                i--
            }
            else{
                i++
            }

            if(h){
                mv.x = i
            }
            else{
                mv.y = i
            }
            
            possible = !checkPawnCollision(p, stage, mv).collision
            // console.log("possible",i!==0 && !possible, i, !possible)
            
        }
        
        console.log("Meilleur mouvement possible pour se rapprocher au maximum", mv)
        return [i, possible, mv]
    }

    const jumpPawns = (h, step, p, stage) => {
        let i = step // Nombre de pas pour manger possible
        let possible = false // Pas de collision ?
        let mv = {x: 0, y: 0}
        while(!possible){ // On détermine le mouvement le plus grand possible
            if(Math.sign(step) === 1){ // - si aller + si retour
                i++
            }
            else{
                i--
            }

            if(h){
                mv.x = i
            }
            else{
                mv.y = i
            }
            
            possible = !checkPawnCollision(p, stage, mv).collision
            // console.log("possible",i!==0 && !possible, i, !possible)
            
        }
        
        console.log("Meilleur mouvement possible pour manger des pions", mv)
        return [i, possible, mv]
    }

    const moveVerticalyPawn = (step, direction, p, update) => {
        let mouvement
        if(direction === "H") {
            mouvement = {x: step, y: 0}
        }
        else if (direction === "V"){
            mouvement = {x: 0, y: step}
        }

        let col = false
        let turnStep
        if(Math.sign(step) === 1){ // - si aller + si retour
            let k = 1
            while(k <= step && !col){
                
                if(direction === "H") {
                    mouvement = {x: k, y: 0}
                }
                else if (direction === "V"){
                    mouvement = {x: 0, y: k}
                }
                if(checkPawnCollision(p, stage, mouvement).collision){
                    col = checkPawnCollision(p, stage, mouvement)
                }
                k++
                
            }
            turnStep = --k
            // console.log(turnStep)
        }
        else{
            let k = -1
            while(k >= step && !col){
                if(direction === "H") {
                    mouvement = {x: k, y: 0}
                }
                else if (direction === "V"){
                    mouvement = {x: 0, y: k}
                }
                if(checkPawnCollision(p, stage, mouvement).collision){
                    col = checkPawnCollision(p, stage, mouvement)
                }
                k--
            }
            turnStep = ++k
            // console.log(turnStep)
        }
        console.log("col", col)
        const collision = col

            if(!collision.collision){
                // console.log("if")
                update({x: mouvement.x, y:mouvement.y, step: step, go:p.go})
            }
            else{
                // SI c'est un mur aller le plus loin possible
                if(collision.mur){ // Si une collision contre un mur est détecté on se rapproche au plus proche du mur
                    console.log("Collision avec un mur")
                    const h = direction === "H"
                    if(h) {
                        mouvement = {x: step, y: 0}
                    }
                    else{
                        mouvement = {x: 0, y: step}
                    }

                    const [i, possible, mv] = bestStepPossible(h, step, p, stage)

                    if(i !== 0){ // Si on est pas au bord du stage
                        mouvement = mv
                    }

                    if(Math.sign(step) === 1){ // SI c'est un aller 
                        if( i === 0){ // Et qu'on est au bord du stage
                            console.log("Bord du stage")
                            if(h) {
                                mouvement = {x: -(4-mouvement.x), y: mouvement.y} 
                            }
                            else{
                                mouvement = {x: mouvement.x, y: -(4-mouvement.y)} 
                            }
                            step = -(4-step) // On se retourne
                            p.go = !p.go

                            moveVerticalyPawn(step, direction, p, update)
                        }
                        else{
                            update({x: mouvement.x, y:mouvement.y, step: step, go:p.go})
                        }

                    }
                    else if (Math.sign(step) === -1 && possible === true){ // Si on arrive vers un mur et que c'est le retour alors on marque 1 point
                        console.log("Marque 1 point !")
                        update({x: mv.x, y:mv.y, step: step, go:p.go})
                    }
                }
                else if(collision.pawn){ // Collision avec un pion
                    console.log("Collision avec un pion")
                    const h = direction === "H"

                    const [i, possible, mv] = jumpPawns(h, turnStep, p, stage)

                    if(i !== 0){ // Si on est pas au bord du stage
                        mouvement = mv
                    }

                    update({x: mouvement.x, y:mouvement.y, step: step, go:p.go})
                }
        }
        const nextpos = {x: p.pos.x + mouvement.x, y: p.pos.y + mouvement.y}
        if(JSON.stringify(nextpos) === JSON.stringify({x:0, y:0}) && p.go === false){
            console.log("Marque 1 point !")
        }
    }
    const resetPawns = () => {
        resetPawn()
        resetPawn1()
        resetPawn2()
        resetPawn3()
        resetPawn4()
        resetPawn5()
        resetPawn6()
        resetPawn7()
        resetPawn8()
        resetPawn9()
    }
    const goBackAll = () =>{
        goBack()
        goBack1()
        goBack2()
        goBack3()
        goBack4()
        goBack5()
        goBack6()
        goBack7()
        goBack8()
        goBack9()
    }
    const startGame = () => {
        //Reset everything
        setStage(createStage())
        // resetPlayer()
        goBackAll()
    }

    return (  
        <StyledSquadroWrapper role="button" tabIndex={0}>
            <StyledSquadro>
                <Stage stage={stage} pawns={pawnPlayer1} moveVerticalyPawn={moveVerticalyPawn}/>
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over"/>)
                        : 
                    (
                    <div>
                        <Display text="Turn" info={"player.squadro"}/>
                    </div>
                    )}
                    <Start callback={startGame}/>
                </aside>
            </StyledSquadro>
        </StyledSquadroWrapper>
    );
}
 
export default Squadro;