import react from 'react';
//Components
import Stage from './Stage';
import Display from './Display';
import { createStage } from '../gameHelpers';
import { StyledGame, StyledGameWrapper } from './styles/StyledGame';

const Game = () => {
    console.log(createStage())
    return (  
        <StyledGameWrapper>
            <StyledGame>
                <Stage stage={createStage()}/>
                <aside>
                    <div>
                        <Display text="Turn"/>
                    </div>
                </aside>
            </StyledGame>
        </StyledGameWrapper>
    );
}
 
export default Game;