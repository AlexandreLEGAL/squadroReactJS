export const STAGE_WIDTH = 7;
export const STAGE_HEIGHT = 7;

export const createStage = () =>
    Array.from(Array(STAGE_HEIGHT), () =>
        new Array(STAGE_WIDTH).fill([0, 'empty'])
    )