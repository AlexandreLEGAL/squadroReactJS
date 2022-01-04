import react, {useState} from 'react';

import { createStage, checkPlayerCollision, checkPawnCollision } from '../gameHelpers';
//Components
import Stage from './Stage';
import Display from './Display';
import Start from './Start';
//Styled componnents
import { StyledSquadro, StyledSquadroWrapper } from './styles/StyledSquadro';

//Custom Hooks

import {usePlayer} from './hook/usePlayer';
import {useStage} from './hook/useStage';
import { usePawn } from './hook/usePawn';

const Game = () => {
    const [turnTime, setTurnTime] = useState(null)
    const [gameOver, setGameOver] = useState(false)

    const [player, updatePlayerPos, resetPlayer] = usePlayer()
    const [pawn, updatePawnPos, resetPawn] = usePawn()
    const [stage, setStage] = useStage(player, createStage(), pawn)
    console.log('re-render')

    const movePlayer = dir => {
        if(!checkPlayerCollision(player, stage, {x:dir, y:0})){
            updatePlayerPos({x: dir, y:0})
        }
    }

    const moveVerticaly = dir => {
        if(!checkPlayerCollision(player, stage, {x:0, y:dir})){
            updatePlayerPos({x: 0, y:dir})
        }
    }

    const moveVerticalyPawn = (step, direction) => {
        let mouvement
        if(direction === "H") {
            mouvement = {x: step, y: 0}
        }
        else if (direction === "V"){
            mouvement = {x: 0, y: step}
        }
        if(JSON.stringify(pawn.pos) === JSON.stringify(player.pos)){
            if(!checkPawnCollision(pawn, stage, mouvement)){
                console.log("if")
                updatePawnPos({x: mouvement.x, y:mouvement.y, step: step, go:pawn.go})
            }
            else{
                console.log("else")
                console.log("step",step)
                console.log("!pawn.go", !pawn.go)
                if(Math.sign(step) === 1){
                    let mouvementInverted
                    if(direction === "H") {
                        mouvementInverted = {x: -(4-mouvement.x), y: mouvement.y} 
                    }
                    else if (direction === "V"){
                        mouvementInverted = {x: mouvement.x, y: -(4-mouvement.y)} 
                    }
                    console.log("avant",pawn.go)
                    updatePawnPos({x: mouvementInverted.x, y:mouvementInverted.y, step:-(4-step), go:!pawn.go})
                    console.log("après",pawn.go)
                }
                else{
                    console.log("Un pion a fait un aller-retour !")
                }
            }
        }
        console.log(pawn)
    }

    const startGame = () => {
        //Reset everything
        setStage(createStage())
        resetPlayer()
        resetPawn()
    }

    const move = ({ keyCode }) => {
        if(!gameOver){
            if(keyCode === 37){ //Left
                movePlayer(-1)
            } else if (keyCode === 39) { // Rigth
                movePlayer(1)
            } else if (keyCode === 40) { // Down
                moveVerticaly(1)   
            } else if (keyCode === 38) { // Up
                moveVerticaly(-1)   
            } else if (keyCode === 65) { // a
                moveVerticalyPawn(pawn.step, pawn.direction)
            }
        }
    }

    return (  
        <StyledSquadroWrapper role="button" tabIndex={0} onKeyDown={e => move(e)}>
            <StyledSquadro>
                <Stage stage={stage}/>
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over"/>)
                        : 
                    (
                    <div>
                        <Display text="Turn" info={player.squadro}/>
                    </div>
                    )}
                    <Start callback={startGame}/>
                </aside>
            </StyledSquadro>
        </StyledSquadroWrapper>
    );
}
 
export default Game;