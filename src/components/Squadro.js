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

    const moveVerticalyPawn = dir => {
        if(!checkPawnCollision(pawn, stage, {x:0, y:dir})){
            updatePawnPos({x: 0, y:dir})
        }
    }

    const startGame = () => {
        //Reset everything
        setStage(createStage())
        resetPlayer()
        // console.log("player",player.pos)
        resetPawn()
        // console.log("pawn",pawn.pos)
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
                moveVerticalyPawn(2)   
            }
            else if (keyCode === 90) { // z
                moveVerticalyPawn(-2)   
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