export const STAGE_WIDTH = 7;
export const STAGE_HEIGHT = 7;

export const createStage = () => {
    const stage = Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, 'empty']))
    stage[0].fill([2, 'empty'])
    stage[stage.length-1].fill([2, 'empty'])
    for(let x = 0; x < stage.length ; x++){
        stage[x].fill([1, 'empty'],0,1)
        stage[x].fill([1, 'empty'],stage.length-1)
    }
    stage[0].fill(["V", 'empty'], 0,1)
    stage[0].fill(["V", 'empty'], stage.length-1)
    stage[stage.length-1].fill(["V", 'empty'], 0,1)
    stage[stage.length-1].fill(["V", 'empty'], stage.length-1)
    return stage
}
    

export const checkCollision = (player, stage, {x: moveX, y: moveY}) => {
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