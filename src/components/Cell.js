import react from "react";
import { StyledCell } from "./styles/StyledCell";
import { SQUADRO } from "../squadro";


const Cell = ({ type }) => {

    return ( 
        <StyledCell type={type} color={SQUADRO[type].color}>
        </StyledCell>
     );
}
 
export default Cell;