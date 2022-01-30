import react from "react";
import Cell from "./Cell";
import { StyledStage } from "./styles/StyledStage";

const Stage = (props) => {
    // let i = 0
    const res = props.stage.map((row,y) => row.map(function (cell, x) {
        // if(props.pawns[0].pos === {y:row, x:x}){
        //     i = props.pawns.indexOf(props.pawns.find(e => e.pos === {x: row, y: x }))
        // }
        let i = undefined // Index 
        if(cell[2]){
            props.pawns.forEach(pawn => {
                if(JSON.stringify(pawn[0].pos) === JSON.stringify({x: x, y: y })){
                    i = props.pawns.indexOf(pawn)
                    // console.log(props.pawns.indexOf(pawn), {x: x, y: y })
                }
            })
        }
        // console.log(props.pawns.forEach(elem => elem.find(e => JSON.stringify(e.pos) === JSON.stringify({x: x, y: y }))))
        const res = <Cell pawns={props.pawns} i={i} moveVerticalyPawn={props.moveVerticalyPawn} key={x} type={cell[0]}  pawn={cell[2]} currentUser={props.currentUser}/>
        // if(cell[2]){
        //     i++
        // }
        return res
    }))

    return (
        <StyledStage width={props.stage[0].length} heigth={props.stage.length}>
            {res}
        </StyledStage>
     );
}

export default Stage;