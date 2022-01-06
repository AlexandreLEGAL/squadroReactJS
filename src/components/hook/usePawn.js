import { useState, useCallback } from "react";
import { PAWN } from "../../squadro";

export const usePawn = ({position}) => {
    const [pawn, setPawn] = useState({
        pos: {x: 5, y:0},
        pawn: PAWN["W"].shape,
        collided: false,
        direction: PAWN["W"].direction,
        step: PAWN["W"].step,
        go: true,
        
    })
    const updatePawnPos = ({x,y,collided, step, go}) => {
        setPawn(prev => ({
            ...prev,
            pos: {x:(prev.pos.x += x/2), y:(prev.pos.y += y/2)},
            collided,
            direction: PAWN["W"].direction,
            step,
            go
        }))
        // console.log(go)
    }

    const resetPawn = useCallback(
        () => {
            setPawn({
                pos:{x: 5, y: 0},
                pawn: PAWN["W"].shape,
                collided: false,
                direction: PAWN["W"].direction,
                step: PAWN["W"].step,
                go:false
            })
            // console.log(pawn.go)
        },
        [],
    )
    return [pawn, updatePawnPos, resetPawn];
}