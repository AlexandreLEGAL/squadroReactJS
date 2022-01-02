import { useState } from "react";

const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: {x: 0, y:0},
        collided: false
    })
    return([player]);
}
 
export default usePlayer;