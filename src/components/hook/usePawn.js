import { PAWN } from "../../squadro";
const usePawn = () => {
    const [pawn, setPawn] = useState({
        pos: {x: 0, y:0},
        pawn: PAWN["B"].shape,
        collided: false
    })
    return [pawn];
}
 
export default usePawn;