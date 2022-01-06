import react from "react";
import Cell from "./Cell";
import { StyledStage } from "./styles/StyledStage";
const Stage = (props) => {
    console.log(props.pawn)
    return ( 
        <StyledStage width={props.stage[0].length} heigth={props.stage.length}>
            {props.stage.map(row => row.map((cell, x) => <Cell direction={props.pawn.direction} step={props.pawn.step} moveVerticalyPawn={props.moveVerticalyPawn} key={x} type={cell[0]}  pawn={cell[2]}/>))}
        </StyledStage>
     );
}
 
export default Stage;