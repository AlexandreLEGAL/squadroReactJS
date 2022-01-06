import { useState, useEffect } from "react";
import { createStage } from "../../gameHelpers";

export const useStage = (
    // player, 
    pawn, blankStage, resetPawn, resetPlayer) => {
    const [stage, setStage] = useState(createStage())

    useEffect(()=>{ 
        const updateStage = prevStage =>{
            //First flush the stage
            const newStage = prevStage.map(
                (row, x)=> row.map(
                    (cell, y) => (cell[1] === 'empty' ? [blankStage[x][y][0], 'empty', blankStage[x][y][2]] : cell)
                )
            )
            // pawn[0].pawn.forEach((row, y) => {
            //     row.forEach((value, x) => {
            //         if(value !== 0){
            //             newStage[y + pawn.pos.y][x + pawn.pos.x][2] = value
            //         }
            //     })
            // })

            pawn.forEach((onePawn) => {
                onePawn[0].pawn.forEach((row, y) => {
                    row.forEach((value, x) => {
                        if(value !== 0){
                            newStage[y + onePawn[0].pos.y][x + onePawn[0].pos.x][2] = value
                        }
                    })
                })
            })
            // Then check if we collided
            // if(player.collided) {
            //     resetPlayer()
            // }
            
            if(pawn[0].collided) {
                resetPawn()
            }
            return newStage
        }

        setStage(prev =>updateStage(prev))
    }, pawn.map((x) => { return x[0] })
    )
    return [stage, setStage];
}

