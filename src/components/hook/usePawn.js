import { useState, useCallback } from "react";
import { PAWN, SQUADRO } from "../../squadro";

export const usePawn = () => {
    const [pawn, setPawn] = useState({
        pos: {x: 1, y:0},
        pawn: PAWN["B"].shape,
        collided: false
    })
    const updatePawnPos = ({x,y,collided}) => {
        setPawn(prev => ({
            ...prev,
            pos: {x:(prev.pos.x += x/2), y:(prev.pos.y += y/2)},
            collided,
        }))
    }

    const resetPawn = useCallback(
        () => {
            setPawn({
                pos:{x: 1, y: 0},
                pawn: PAWN["B"].shape,
                collided: false,
            })
        },
        [],
    )
    return [pawn, updatePawnPos, resetPawn];
}