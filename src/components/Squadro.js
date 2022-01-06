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
    const [pawn, updatePawnPos, resetPawn] = usePawn({position:{x:1, y:0}})
    const [pawn1, updatePawnPos1, resetPawn1] = usePawn({position:{x:2, y:0}})
    const [stage, setStage] = useStage(
        // player,
         createStage(), pawn)
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

    const moveVerticalyPawn = (step, direction) => {
        
        let mouvement
        if(direction === "H") {
            mouvement = {x: step, y: 0}
        }
        else if (direction === "V"){
            mouvement = {x: 0, y: step}
        }
        const collision = checkPawnCollision(pawn, stage, mouvement)
        // if(JSON.stringify(pawn.pos) === JSON.stringify(player.pos)){
            if(!collision.collision){
                // console.log("if")
                updatePawnPos({x: mouvement.x, y:mouvement.y, step: step, go:pawn.go})
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
                            console.log("-1")
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
                        
                        possible = !checkPawnCollision(pawn, stage, mv).mur
                        console.log("possible",i!==0 && !possible, i, !possible)
                        
                    }
                    {console.log(i)
                    if(i !== 0)
                        mouvement = mv
                    }
                    console.log("Meilleur mouvement possible pour se rapprocher au maximum", mouvement, mv)

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
                            pawn.go = !pawn.go
                            // updatePawnPos({x: mouvementInverted.x, y:mouvementInverted.y, step:, go:!pawn.go})
                            // console.log("après",pawn.go)
                        }
                        updatePawnPos({x: mouvement.x, y:mouvement.y, step: step, go:pawn.go})
                    }
                    else if (Math.sign(step) === -1 && possible === true){ // Si on arrive vers un mur et que c'est le retour alors on marque 1 point
                        // console.log("Marque 1 point !")
                        updatePawnPos({x: mv.x, y:mv.y, step: step, go:pawn.go})
                    }
                }
                // console.log("else")
                // console.log("step",step)
                // console.log("!pawn.go", !pawn.go)
                 
            // }
        }
        const nextpos = {x: pawn.pos.x + mouvement.x, y: pawn.pos.y + mouvement.y}
        if(JSON.stringify(nextpos) === JSON.stringify({x:0, y:0}) && pawn.go === false){
            console.log("Marque 1 point !")
        }
        // console.log(pawn)
    }

    const startGame = () => {
        //Reset everything
        setStage(createStage())
        // resetPlayer()
        resetPawn()
    }

    const move = ({ keyCode }) => {
        if(!gameOver){
            // if(keyCode === 37){ //Left
            //     movePlayer(-1)
            // } else if (keyCode === 39) { // Rigth
            //     movePlayer(1)
            // } else if (keyCode === 40) { // Down
            //     moveVerticaly(1)   
            // } else if (keyCode === 38) { // Up
            //     moveVerticaly(-1)   
            // } 
            if (keyCode === 65) { // a
                moveVerticalyPawn(pawn.step, pawn.direction)
            }
        }
    }
    const f = () =>{
        console.log("test")
    }

    return (  
        <StyledSquadroWrapper role="button" tabIndex={0} onKeyDown={e => move(e)}>
            <StyledSquadro>
                <Stage stage={stage} pawn={pawn} moveVerticalyPawn={moveVerticalyPawn} f={f}/>
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