import react, {useState} from 'react';

import { createStage, checkCollision } from '../gameHelpers';
//Components
import Stage from './Stage';
import Display from './Display';
import Start from './Start';
//Styled componnents
import { StyledSquadro, StyledSquadroWrapper } from './styles/StyledSquadro';

//Custom Hooks

import {usePlayer} from './hook/usePlayer';
import {useStage} from './hook/useStage';

const Game = () => {
    const [turnTime, setTurnTime] = useState(null)
    const [gameOver, setGameOver] = useState(false)

    const [player, updatePlayerPos, resetPlayer] = usePlayer()
    const [stage, setStage] = useStage(player, createStage())
    console.log('re-render')

    const movePlayer = dir => {
        if(!checkCollision(player, stage, {x:dir, y:0})){
            updatePlayerPos({x: dir, y:0})
        }
    }

    const moveVerticaly = dir => {
        if(!checkCollision(player, stage, {x:0, y:dir})){
            updatePlayerPos({x: 0, y:dir})
        }
    }

    const startGame = () => {
        //Reset everything
        setStage(createStage())
        resetPlayer()
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