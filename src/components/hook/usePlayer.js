import { useState, useCallback } from "react";
import { squadroPiece } from "../../squadro";

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        score: 0,
        turn: false
    })

    const updatePlayer = (newScore, newTurn) => {
        setPlayer(prev => ({
            ...prev,
            score: prev.score += newScore/2,
            turn: newTurn
        }))
    }

    const resetPlayer = useCallback(
        () => {
            setPlayer({
                score: 0,
                turn: false
            })
        },
        [],
    )
    return[player, updatePlayer, resetPlayer]
}
    