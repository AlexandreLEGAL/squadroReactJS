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
        shape: [["B"]], color: "0, 0, 0", direction: "H", 
        1:{
            step : 3,
            pos : {x:0, y:1}
        },
        2:{
            step : 1,
            pos : {x:0, y:2}
        },
        3:{
            step : 2,
            pos : {x:0, y:3}
        },
        4:{
            step : 1,
            pos : {x:0, y:4}
        },
        5:{
            step : 3,
            pos : {x:0, y:5}
        }
        
    },
    W:{
        shape: [["W"]], color: "256, 256, 256", direction: "V", 
        1:{
            step : 1,
            pos : {x:1, y:0}
        },
        2:{
            step : 3,
            pos : {x:2, y:0}
        },
        3:{
            step : 2,
            pos : {x:3, y:0}
        },
        4:{
            step : 3,
            pos : {x:4, y:0}
        },
        5:{
            step : 1,
            pos : {x:5, y:0}
        }
    },
}
export const squadroPiece = () => {
    const squadro = "BW"
    const randSquadro =
        squadro[Math.floor(Math.random() * squadro.length)]
    return SQUADRO[randSquadro]
}