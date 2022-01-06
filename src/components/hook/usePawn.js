import { useState, useCallback } from "react";
import { PAWN } from "../../squadro";

export const usePawn = ({color},{number}) => {
    const [pawn, setPawn] = useState({
        pos: PAWN[color][number].pos,
        pawn: PAWN[color].shape,
        collided: false,
        direction: PAWN[color].direction,
        step: PAWN[color][number].step,
        go: true,
        
    })
    const updatePawnPos = ({x,y,collided, step, go}) => {
        setPawn(prev => ({
            ...prev,
            pos: {x:(prev.pos.x += x/2), y:(prev.pos.y += y/2)},
            collided,
            direction: PAWN[color].direction,
            step,
            go
        }))
        // console.log(go)
    }

    const resetPawn = () => {
            setPawn({
                pos:PAWN[color][number].pos,
                pawn: PAWN[color].shape,
                collided: false,
                direction: PAWN[color].direction,
                step: PAWN[color][number].step,
                go:false
            })
            // console.log(pawn.go)
        }
    return [pawn, updatePawnPos, resetPawn];
}