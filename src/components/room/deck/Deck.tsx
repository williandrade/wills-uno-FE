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

const DeckCards = React.memo(function DeckCards(props: { playCard: (card: UnoCard) => void }) {
    const {canPlayCard} = useUnoStore();
    const {cards, isTurn} = usePlayerStore(
        useShallow((state) => ({cards: state.player.hand, isTurn: state.player.isTurn})),
    );

    const getStyle = (style: any, snapshot: any) => {
        if (!snapshot.isDragging) return {};
        if (!snapshot.isDropAnimating) {
            return style;
        }

        return {
            ...style,
            // cannot be 0, but make it super tiny
            transitionDuration: `0.001s`
        };
    }

    return (
        <>
            {(cards as UnoCard[]).map((card, i) => (
                <Draggable key={i} draggableId={`${i}`} index={i} isDragDisabled={!(canPlayCard(card))}>
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                             style={getStyle(provided.draggableProps.style, snapshot)}>
                            <motion.div
                                key={i}
                                className={`play-card bottom-0 relative w-20 md:w-32 ${(canPlayCard(card)) ? 'cursor-pointer' : ''}`}
                                initial={{opacity: 0, scale: 1.1}}
                                animate={{opacity: (canPlayCard(card)) ? 1 : 0.6, scale: 1}}
                                whileHover={(canPlayCard(card)) ? {bottom: 20} : undefined}
                                transition={{type: "spring", stiffness: 100}}
                                onDoubleClick={() => {
                                    if (!(canPlayCard(card))) {
                                        return;
                                    }

                                    props.playCard(card)
                                }}
                            >
                                <Card card={card}/>
                            </motion.div>
                        </div>
                    )}
                </Draggable>
            ))}
        </>
    )
});

function Deck(props: { playCard: (card: UnoCard) => void }) {
    return (
        <Droppable droppableId="deck" direction={"horizontal"} isCombineEnabled={false}>
            {(droppableProvided) => (
                <div className="flex flex-wrap w-full justify-start gap-2" {...droppableProvided.droppableProps}
                     ref={droppableProvided.innerRef}>
                    <DeckCards {...props}/>
                    <span style={{
                        display: "none"
                    }}>{droppableProvided.placeholder}</span>
                </div>
            )}
        </Droppable>
    );
}

export default Deck;