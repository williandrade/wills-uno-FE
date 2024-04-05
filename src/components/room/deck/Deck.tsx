import React from "react";
import './Deck.css';
import {UnoCard} from "../../../types";
import Card from "../../card/Card";
import uno from '../../../assets/uno-logo.svg';
import {Button} from "@material-tailwind/react";
import {usePlayerStore} from "../../../stores/PlayerStore";
import {useUnoStore} from "../../../stores/UnoStore";
import {useShallow} from "zustand/react/shallow";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {motion} from "framer-motion";

const DeckCards = React.memo(function DeckCards() {
    const {playCard} = usePlayerStore();
    const {canPlayCard} = useUnoStore();
    const {cards, isTurn} = usePlayerStore(
        useShallow((state) => ({cards: state.player.hand, isTurn: state.player.isTurn})),
    );

    return (
        <>
            {(cards as UnoCard[]).map((card, i) => (
                <Draggable key={i} draggableId={`${i}`} index={i} isDragDisabled={!(canPlayCard(card) && isTurn)}>
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <motion.div
                                key={i}
                                className={`play-card bottom-0 relative w-20 md:w-32 ${(canPlayCard(card) && isTurn) ? 'cursor-pointer' : ''}`}
                                initial={{opacity: 0, scale: 1.1}}
                                animate={{opacity: (canPlayCard(card) && isTurn) ? 1 : 0.6, scale: 1}}
                                whileHover={(canPlayCard(card) && isTurn) ? {bottom: 20} : undefined}
                                transition={{type: "spring", stiffness: 100}}
                                onDoubleClick={() => {
                                    if (!(canPlayCard(card) && isTurn)){
                                        return;
                                    }

                                    playCard(card)
                                }}
                            >
                                {/*<div*/}
                                {/*    ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}*/}
                                {/*    className={`play-card transition-all ease-in duration-75 bottom-0 relative w-20 md:w-32 ${canPlayCard(card) && isTurn ? 'hover:bottom-5 cursor-pointer' : 'opacity-40'}`}*/}
                                {/*    onDoubleClick={() => {*/}
                                {/*        if (!(canPlayCard(card) && isTurn)){*/}
                                {/*            return;*/}
                                {/*        }*/}

                                {/*        playCard(card)*/}
                                {/*    }}>*/}
                                <Card card={card}/>
                                {/*</div>*/}
                            </motion.div>
                        </div>
                    )}
                </Draggable>
            ))}
        </>
    )
});

function Deck() {
    return (
        <Droppable droppableId="deck" direction={"horizontal"}>
            {(droppableProvided) => (
                <div className="flex flex-wrap w-full justify-start gap-2" {...droppableProvided.droppableProps}
                     ref={droppableProvided.innerRef}>
                    <DeckCards/>
                    {droppableProvided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

export default Deck;