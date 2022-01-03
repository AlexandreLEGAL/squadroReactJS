import react from "react";
import { StyledDisplay } from "./styles/StyledDisplay";
const Display = ({gameOver, text, info}) => {
    return (
        <StyledDisplay gameOver={gameOver}>
            {text}{info ? " = " + info : ""}
        </StyledDisplay>
    );
}
 
export default Display;