import React from 'react';
import './Room.css';
import OtherPlayer from "./other_player/OtherPlayer";
import Deck from "./deck/Deck";
import Discard from "../discard/Discard";
import {useUnoStore} from "../../stores/UnoStore";
import {usePlayerStore} from "../../stores/PlayerStore";
import logo from "../../assets/uno-logo.svg";
import {Button} from '@material-tailwind/react';
import {DragDropContext, Droppable, DropResult, ResponderProvided} from 'react-beautiful-dnd';
import {useShallow} from "zustand/react/shallow";
import {UnoCard} from "../../types";
import Card from "../card/Card";
import {motion} from "framer-motion";
import {isEqual, map} from "lodash";

const PlayersList = React.memo(function PlayersList() {

    const {isUserTurn} = useUnoStore(
        useShallow((state) => ({isUserTurn: state.isUserTurn})),
    );
    const players = useUnoStore(
        useShallow((state) => state.players),
        (oldPlayers, newPlayers) => isEqual(oldPlayers, newPlayers),
    );

    return (
        <>
            {players.map((player, i) => (
                <div className="ml-5" key={i}>
                    <OtherPlayer playerName={player.name ?? ""}
                                 isTurn={isUserTurn(player.id ?? "")}
                                 numberOfCards={player.hand as number ?? 0}/>
                </div>
            ))}
        </>
    );
});

function Room() {

    const {callUno, playCard, drawCard} = usePlayerStore(
        useShallow((state) => ({callUno: state.callUno, playCard: state.playCard, drawCard: state.drawCard})),
    );
    const {cards, isTurn} = usePlayerStore(
        useShallow((state) => ({cards: state.player.hand, isTurn: state.player.isTurn})),
    );

    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
        if (result.destination && result.destination.droppableId === 'discard') {
            const card = (cards as UnoCard[])[+result.draggableId];
            playCard(card);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div
                className="relative h-screen w-screen flex flex-col overflow-hidden room-bg">
                <div className="flex flex-row items-center justify-start">
                    <div className="relative m-6 mx-4">
                        <img className="h-16" src={logo} alt="logo"/>
                    </div>
                    <PlayersList/>
                    <div className="flex-grow"></div>
                    <div className="relative w-36">
                        <motion.div
                            className={`play-card w-32 absolute ${isTurn ? 'cursor-pointer' : ''}`}
                            style={{top: -120}}
                            whileHover={{top: isTurn ? -100 : -120}}
                            transition={{type: "spring", stiffness: 400}}
                            onClick={() => {
                                if (!isTurn)
                                    return;

                                drawCard(1)
                            }}
                        >
                            <Card/>
                        </motion.div>
                    </div>
                </div>
                <div className="flex-grow">
                    <div className="flex items-center justify-center w-full h-full">
                        <Discard/>
                    </div>
                </div>
                <div className="flex flex-row flex-initial p-5 h-1/4 md:h-fit">
                    <div className="flex-grow flex-1">
                        <Deck/>
                    </div>
                    <div className="flex flex-col gap-3 flex-none">
                        <Button disabled={!isTurn}
                                placeholder=""
                                size="lg"
                                color="blue"
                                onClick={() => callUno}>Call UNO</Button>
                        <Button placeholder="" size="lg" color="red">Missed UNO</Button>
                    </div>
                </div>
            </div>
        </DragDropContext>
    );
}

export default Room;