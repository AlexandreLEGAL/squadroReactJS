import { useState, useEffect } from "react";
import { createStage } from "../../gameHelpers";

export const useStage = (player, blankStage, pawn, resetPawn, resetPlayer) => {
    const [stage, setStage] = useState(createStage())

    useEffect(()=>{
        const updateStage = prevStage =>{
            //First flush the stage
            const newStage = prevStage.map(
                (row, x)=> row.map(
                    (cell, y) => (cell[1] === 'empty' ? [blankStage[x][y][0], 'empty', blankStage[x][y][2]] : cell)
                )
            )

            // Then draw the cursor
            player.squadro.forEach((row, y) => {
                row.forEach((value, x) => {
                    if(value !== 0){
                        newStage[y + player.pos.y][x + player.pos.x] = [ // Cursor
                            value,
                            `${player.collided ? 'merged' : 'empty'}`,
                            null
                        ]
                    }
                })
            })
            // Then draw the pawns
            pawn.pawn.forEach((row, y) => {
                row.forEach((value, x) => {
                    if(value !== 0){
                        newStage[y + pawn.pos.y][x + pawn.pos.x][2] = value
                    }
                })
            })
            // Then check if we collided
            if(player.collided) {
                resetPlayer()
            }
            if(pawn.collided) {
                resetPawn()
            }
            return newStage
        }

        setStage(prev =>updateStage(prev))
    }, [player, resetPlayer, pawn, resetPawn])
    return [stage, setStage];
}

