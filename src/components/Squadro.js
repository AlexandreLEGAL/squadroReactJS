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

    const [pawn,    updatePawnPos,      resetPawn]    = usePawn({color:"B"}, {number:1}) // Couleur, numero
    const [pawn1,   updatePawnPos1,     resetPawn1]   = usePawn({color:"B"}, {number:2})
    const [pawn2,   updatePawnPos2,     resetPawn2]   = usePawn({color:"B"}, {number:3})
    const [pawn3,   updatePawnPos3,     resetPawn3]   = usePawn({color:"B"}, {number:4})
    const [pawn4,   updatePawnPos4,     resetPawn4]   = usePawn({color:"B"}, {number:5})
    const [pawn5,   updatePawnPos5,     resetPawn5]   = usePawn({color:"W"}, {number:1})
    const [pawn6,   updatePawnPos6,     resetPawn6]   = usePawn({color:"W"}, {number:2})
    const [pawn7,   updatePawnPos7,     resetPawn7]   = usePawn({color:"W"}, {number:3})
    const [pawn8,   updatePawnPos8,     resetPawn8]   = usePawn({color:"W"}, {number:4})
    const [pawn9,   updatePawnPos9,     resetPawn9]   = usePawn({color:"W"}, {number:5})
    
    const pawnPlayer1 = [].concat(
        [[pawn, updatePawnPos, resetPawn]],
        [[pawn1, updatePawnPos1, resetPawn1]],
        [[pawn2, updatePawnPos2, resetPawn2]],
        [[pawn3, updatePawnPos3, resetPawn3]],
        [[pawn4, updatePawnPos4, resetPawn4]],
        [[pawn5, updatePawnPos5, resetPawn5]],
        [[pawn6, updatePawnPos6, resetPawn6]],
        [[pawn7, updatePawnPos7, resetPawn7]],
        [[pawn8, updatePawnPos8, resetPawn8]],
        [[pawn9, updatePawnPos9, resetPawn9]],
        
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

    const moveVerticalyPawn = (step, direction, p, update) => {
        // console.log("p", p)
        let mouvement
        if(direction === "H") {
            mouvement = {x: step, y: 0}
        }
        else if (direction === "V"){
            mouvement = {x: 0, y: step}
        }
        const collision = checkPawnCollision(p, stage, mouvement)
        // if(JSON.stringify(pawn.pos) === JSON.stringify(player.pos)){
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
                        
                        possible = !checkPawnCollision(p, stage, mv).mur
                        // console.log("possible",i!==0 && !possible, i, !possible)
                        
                    }
                    {
                    if(i !== 0)
                        mouvement = mv
                    }
                    console.log("Meilleur mouvement possible pour se rapprocher au maximum", mv)

                    if(Math.sign(step) === 1){ // SI c'est un aller 
                        if( i === 0){ // Et qu'on est au bord du stage
                            console.log("Bord du stage")
                            if(h) {
                                mouvement = {x: -(4-mouvement.x), y: mouvement.y} 
                            }
                            else{
                                mouvement = {x: mouvement.x, y: -(4-mouvement.y)} 
                            }
                            // console.log("avant",pawn.go)
                            // moveVerticalyPawn(step, direction)
                            step = -(4-step) // On se retourne
                            p.go = !p.go
                            // updatePawnPos({x: mouvementInverted.x, y:mouvementInverted.y, step:, go:!pawn.go})
                            // console.log("après",pawn.go)
                        }
                        update({x: mouvement.x, y:mouvement.y, step: step, go:p.go})
                    }
                    else if (Math.sign(step) === -1 && possible === true){ // Si on arrive vers un mur et que c'est le retour alors on marque 1 point
                        // console.log("Marque 1 point !")
                        update({x: mv.x, y:mv.y, step: step, go:p.go})
                    }
                }
                // console.log("else")
                // console.log("step",step)
                // console.log("!pawn.go", !pawn.go)
                 
            // }
        }
        const nextpos = {x: p.pos.x + mouvement.x, y: p.pos.y + mouvement.y}
        if(JSON.stringify(nextpos) === JSON.stringify({x:0, y:0}) && p.go === false){
            console.log("Marque 1 point !")
        }
        // console.log(pawn)
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
    const startGame = () => {
        //Reset everything
        setStage(createStage())
        // resetPlayer()
        resetPawns()
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