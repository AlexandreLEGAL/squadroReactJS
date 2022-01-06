export const SQUADRO = {
    V: {
        shape: [["V"]], color: "128, 128, 128" // Case VIDE (angles)
    },
    0: {
        shape: [[0]], color: "128, 128, 128" // Case en croix
    },
    1: {
        shape: [[1]], color: "232, 208, 32" // Case horizontal
    },
    2: {
        shape: [[2]], color: "232, 59, 32" // Case vertical
    },
    B: {
        shape: [["B"]], color: "0, 0, 0" // Curseur Joueur Blanc
    },
    W: {
        shape: [["W"]], color: "256, 256, 256" // Curseur Joueur Noir
    }
}

export const PAWN = {
    B:{
        shape: [["B"]], color: "0, 0, 0", direction: "H", step : 3 // Orientation Horizontal
    },
    W:{
        shape: [["W"]], color: "256, 256, 256", direction: "H", step: 2 // Orientation Vertical
    },
}
export const squadroPiece = () => {
    const squadro = "BW"
    const randSquadro =
        squadro[Math.floor(Math.random() * squadro.length)]
    return SQUADRO[randSquadro]
}