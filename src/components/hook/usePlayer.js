import { useState, useCallback } from "react";
import { squadroPiece } from "../../squadro";

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: {x: 0, y:0},
        squadro: squadroPiece().shape,
        collided: false
    })

    const updatePlayerPos = ({x,y,collided}) => {
        setPlayer(prev => ({
            ...prev,
            pos: {x:(prev.pos.x += x/2), y:(prev.pos.y += y/2)},
            collided,
        }))
    }

    const resetPlayer = useCallback(
        () => {
            setPlayer({
                pos:{x: 0, y: 0},
                squadro: squadroPiece().shape,
                collided: false,
            })
        },
        [],
    )
    return[player, updatePlayerPos, resetPlayer]
}
    