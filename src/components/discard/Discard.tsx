import React from "react";
import Card from "../card/Card";
import {useUnoStore} from "../../stores/UnoStore";
import {random} from "lodash";
import {Droppable} from "react-beautiful-dnd";
import {motion} from "framer-motion";
import {usePlayerStore} from "../../stores/PlayerStore";
import {useShallow} from "zustand/react/shallow";

// do not re-render if the students list reference has not changed
const DeckOfDiscard = React.memo(function DeckOfDiscard() {
    const discardPile = useUnoStore(
        useShallow((state) => state.gameState.discardPile),
        (oldPile, newPile) => oldPile.length === newPile.length,
    );

    const angleIncrement = 25 / 3;

    return (
        <div className="relative w-80 h-80 flex justify-center items-center">
            {discardPile.slice(-5).map((card, i) => {
                const randomNum = random(-30, 30);
                return (
                    <motion.div
                        key={`${card.color}-${card.value}-${i}`}
                        className={`transition-all w-36 absolute drop-shadow-lg`}
                        initial={{opacity: 0, scale: 1.5, rotate: 0.0}}
                        animate={{opacity: 1, scale: 1, rotate: randomNum}}
                    >
                        <Card card={card}/>
                    </motion.div>
                )
            })}
        </div>
    );
});

function Discard() {
    return (
        <Droppable droppableId="discard">
            {(provided) => (
                <div
                    className="h-80 overflow-visible bg-clip-border rounded-md flex justify-center items-center" {...provided.droppableProps}
                    ref={provided.innerRef}>
                    <DeckOfDiscard/>
                </div>)}
        </Droppable>
    );
}

export default Discard;