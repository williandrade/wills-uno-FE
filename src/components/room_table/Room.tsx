import React from 'react';
import './Room.css';
import OtherPlayer from "./other_player/OtherPlayer";
import Deck from "./deck/Deck";
import Discard from "../discard/Discard";
import {useUnoStore} from "../../stores/UnoStore";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {usePlayerStore} from "../../stores/PlayerStore";

function Room() {

    const players = useUnoStore(state => state.players);
    const {isUserTurn} = useUnoStore();
    const {callUno} = usePlayerStore();

    const onDragEnd = () => {
        // the only one that is required
    };

    return (
        // <DragDropContext onDragEnd={onDragEnd}>
            <div
                className="relative h-screen w-screen text-white flex pt-32 justify-center overflow-hidden bg-gradient-to-br room-bg">
                <div className="w-full max-w-screen-xl">
                    <div className="grid grid-cols-3 gap-16">
                        <div className="grid grid-cols-subgrid gap-6 col-span-3">
                            <div className="col-start-2">
                                {players[1] && <OtherPlayer
                                    playerName={players[1]?.name ?? ""}
                                    isTurn={isUserTurn(players[1]?.id ?? "")}
                                    numberOfCards={players[1]?.hand as number ?? 0}/>
                                }
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            {players[0] && <OtherPlayer
                                playerName={players[0]?.name ?? ""}
                                isTurn={isUserTurn(players[0]?.id ?? "")}
                                numberOfCards={players[0]?.hand as number ?? 0}/>
                            }
                        </div>
                        <div>
                            {/*<Droppable droppableId={"discard"}>*/}
                            {/*    {(provided, snapshot) => (*/}
                                    <Discard />
                                {/*)}*/}
                            {/*</Droppable>*/}
                        </div>
                        <div className="flex justify-center items-center">
                            {players[2] && <OtherPlayer
                                playerName={players[2]?.name ?? ""}
                                isTurn={isUserTurn(players[2]?.id ?? "")}
                                numberOfCards={players[2]?.hand as number ?? 0}/>
                            }
                        </div>
                        <div className="grid grid-cols-subgrid gap-6 col-span-3">
                            <button
                                className="select-none rounded-lg bg-gray-900 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                                onClick={() => {
                                    callUno();
                                }}
                            >
                                Call Uno
                            </button>
                            {/*<div className="col-start-2 pt-12">*/}
                            {/*    <Deck/>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
                <Deck/>
            </div>
        // </DragDropContext>
    );
}

export default Room;