import styled from "styled-components";

export const StyledPawn = styled.div`
    height: 25px;
    width: 25px;
    background-color: ${props => (props.color==="B" ? 'lightcoral' : 'lightyellow')};
    border-radius: 50%;
    display: inline-block;
`