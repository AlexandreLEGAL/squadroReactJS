import { useState, useEffect } from "react";
import { createStage } from "../../gameHelpers";

export const useStage = (player, blankStage, resetPlayer) => {
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
                    if(value !== 0 || value !== 1 || value !== 2){
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'empty'}`
                        ]
                    }
                })
            })
            // Then check if we collided
            if(player.collided) {
                resetPlayer()
            }

            return newStage
        }

        setStage(prev =>updateStage(prev))
    }, [player, resetPlayer])
    return [stage, setStage];
}

