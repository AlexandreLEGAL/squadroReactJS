import react from "react";
import { StyledCell } from "./styles/StyledCell";
import { SQUADRO } from "../squadro";
import { StyledPawn } from "./styles/StyledPawn";


const Cell = (props) => {
    // console.log(props)
    let res
    {props.pawn ? 
        res = <StyledCell role="button" onClick={() => {props.moveVerticalyPawn(props.step, props.direction)}} type={props.type} color={SQUADRO[props.type].color} ><StyledPawn color={props.pawn}/></StyledCell>
    :       
        res = <StyledCell type={props.type} color={SQUADRO[props.type].color}></StyledCell>}
    return (res)
//         {pawn ?
//             <StyledCell ><StyledPawn color={pawn}/> :</StyledCell>
//             : ""
//         }
//         <StyledCell {pawn ? 'role="button" onClick={moveVerticalyPawn(pawn.step, pawn.direction)}' : ''}
//         type={type} color={SQUADRO[type].color}>
//             {pawn ? <StyledPawn color={pawn}/> : ""}
            
//             {/* {type === 0 ? 
//         <svg viewBox="0 0 512 512">
// 		<path d="M496.645,170.667H336.314V10.432C336.314,4.889,331.522,0,325.978,0H185.429c-5.544,0-9.743,4.889-9.743,10.432v160.234
// 			H14.762c-5.544,0-9.743,4.889-9.743,10.432v140.549c0,5.544,4.199,9.646,9.743,9.646h160.924v171.06
// 			c0,5.544,4.199,9.646,9.743,9.646h140.549c5.544,0,10.336-4.102,10.336-9.646v-171.06h160.331c5.544,0,10.336-4.102,10.336-9.646
// 			V181.099C506.98,175.555,502.189,170.667,496.645,170.667z M486.902,311.216H325.978c-5.544,0-9.743,4.889-9.743,10.432v170.273
// 			H195.765V321.648c0-5.544-4.792-10.432-10.336-10.432H25.098V190.745h160.331c5.544,0,10.336-4.102,10.336-9.646V20.078h120.471
// 			v161.021c0,5.544,4.199,9.646,9.743,9.646h160.924V311.216z"/>

// </svg>
// : type === 1 ?
// <svg viewBox="0 0 512 512">
// <rect x="8" y="168" width="496" height="176"/>
// </svg>
// : type === 2 ? 
// <svg viewBox="0 0 512 512">
// <rect x="168" y="8" width="176" height="496"/>
// </svg>
// : ""} */}
//         </StyledCell>
}
 
export default react.memo(Cell);