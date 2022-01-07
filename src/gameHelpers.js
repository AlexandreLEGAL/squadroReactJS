export const STAGE_WIDTH = 7;
export const STAGE_HEIGHT = 7;

export const createStage = () => {
    const stage = Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, 'empty', null]))
    stage[0].fill([2, 'empty', null])
    stage[stage.length-1].fill([2, 'empty', null])
    for(let x = 0; x < stage.length ; x++){
        stage[x].fill([1, 'empty', null],0,1)
        stage[x].fill([1, 'empty', null],stage.length-1)
    }
    stage[0].fill(["V", 'empty', null], 0,1)
    stage[0].fill(["V", 'empty', null], stage.length-1)
    stage[stage.length-1].fill(["V", 'empty', null], 0,1)
    stage[stage.length-1].fill(["V", 'empty', null], stage.length-1)
    return stage
}
    

export const checkPlayerCollision = (player, stage, {x: moveX, y: moveY}) => {
    for(let y = 0; y < player.squadro.length; y += 1){
        for (let x = 0; x < player.squadro[y].length; x += 1){
            // Check that we're on an actual Squadro cell
            if (player.squadro[y][x] !== 0) {
                if(
                // Check that our move is inside the game areas height (y)
                // We souldn't go through the bottom of the play area
                !stage[y + player.pos.y + moveY] ||
                // Check that our move is inside the game area width (x)
                !stage[y + player.pos.y + moveY][x + player.pos.x + moveX]
                // // Check that the cell we're moving to isn't set to clear
                // stage[y + player.pos.y + moveY] [x + player.pos.x + moveX][1] !== 'empty' // Collision avec les blocs
                ) 
                {
                    return true
                }
            }
        }
    }
}

export const checkPawnCollision = (pawn, stage, {x: moveX, y: moveY}) => {
    // console.log('x', moveX, 'y', moveY)
    const res = {collision:false, mur:false, pawn: false}
    for(let y = 0; y < pawn.pawn.length; y += 1){
        for (let x = 0; x < pawn.pawn[y].length; x += 1){
            // Check that we're on an actual Squadro cell
            if (pawn.pawn[y][x] !== 0) {
                // console.log(stage[y + pawn.pos.y + moveY][pawn.pos.x])
                if(
                // Check that our move is inside the game areas height (y)
                // We souldn't go through the bottom of the play area
                !stage[y + pawn.pos.y + moveY] ||
                // Check that our move is inside the game area width (x)
                !stage[y + pawn.pos.y + moveY][x + pawn.pos.x + moveX]
                // // Check that the cell we're moving to isn't set to clear
                // stage[y + pawn.pos.y + moveY] [x + pawn.pos.x + moveX][1] !== 'empty' // Collision avec les blocs
                ) 
                {
                    // console.log("Collision detected avec un mur")
                    res.collision = true
                    res.mur = true 
                    // return {collision:true, mur:true, pawn:false}
                }
                else if(stage[y + pawn.pos.y + moveY][x + pawn.pos.x + moveX][2]) // Collision avec un pion
                {
                    // console.log("collision avec un pion", stage[y + pawn.pos.y + moveY][x + pawn.pos.x + moveX][2])
                    res.collision = true
                    res.pawn = true
                    // return {collision:true, mur:false, pawn: true}
                }
            }
        }
    }
    // console.log(res)
    return res
}