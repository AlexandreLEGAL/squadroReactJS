import react from "react";
import { StyledStart } from "./styles/StyledStart";
const Start = ({callback}) => (
    <StyledStart onClick={callback}>
        Reset
    </StyledStart>
)
 
export default Start;