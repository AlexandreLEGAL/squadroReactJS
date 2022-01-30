import { useState, useCallback } from "react";
import { PAWN } from "../../squadro";

export const usePawn = ({color},{number}) => {
    const [pawn, setPawn] = useState({
        pos: {...PAWN[color][number].pos}, // Créer une copie pour ne pas modifié la valeur dans PAWN
        pawn: PAWN[color].shape,
        collided: false,
        direction: PAWN[color].direction,
        step: PAWN[color][number].step,
        go: true,
        color: color,
        number: number,
        end: false
        
    })
    const updatePawnPos = ({x,y,collided, step, go}) => {
        setPawn(prev => ({
            ...prev,
            pos: {x:(prev.pos.x += x/2), y:(prev.pos.y += y/2)},
            collided,
            direction: PAWN[color].direction,
            step,
            go: go,
            end: false
        }))
    }

    const resetPawn = () => {
            setPawn({
                pos: {...PAWN[color][number].pos},
                pawn: PAWN[color].shape,
                collided: false,
                direction: PAWN[color].direction,
                step: PAWN[color][number].step,
                go:false,
                end: false
            })
        }
    const goBack = () => {
        let position = {...PAWN[color][number].pos}
        console.log("goBack", pawn)
        if(!pawn.go){
            if(pawn.direction === "H"){
                position.x = 6
            }
            else{
                position.y = 6
            }
        }
        setPawn(prev => ({
            ...prev,
            pos: position,
        }))
    }
    return [pawn, updatePawnPos, resetPawn, goBack];
}