import styled from "styled-components";

export const StyledPawn = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${props => (props.color==="B" ? 'lightcoral' : 'lightyellow')};
    border-radius: 50%;
    display: inline-block;
`