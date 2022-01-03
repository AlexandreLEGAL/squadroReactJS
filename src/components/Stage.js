import react from "react";
import Cell from "./Cell";
import { StyledStage } from "./styles/StyledStage";
const Stage = ({stage}) => {
    return ( 
        <StyledStage width={stage[0].length} heigth={stage.length}>
            {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} pawn={cell[2]}/>))}
        </StyledStage>
     );
}
 
export default Stage;