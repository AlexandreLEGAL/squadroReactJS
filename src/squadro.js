export const SQUADRO = {
    0: {shape: [[0]], color: "128, 128, 128"},
    B: {
        shape: [['B']], color: "0, 0, 0"
    },
    W: {
        shape: [['W']], color: "256, 256, 256"
    }
}

export const squadroPiece = (color) => {
    const squadro = "BW"
    const randSquadro =
        squadro[Math.floor(Math.random() * squadro.length)]
    return SQUADRO[randSquadro]
}