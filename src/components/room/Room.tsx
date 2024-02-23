import React from 'react';
import './Room.css';
import OtherPlayer from "../other_player/OtherPlayer";
import Card from "../card/Card";
import {Color, Type, UnoCard, Value} from "../../types";


function Room() {

    const card1: UnoCard = {
        value: Value.Zero,
        color: Color.Blue,
        type: Type.Number
    };

    return (
        <>
            <div className="h-screen w-screen bg-slate-400 text-white flex pt-32 justify-center">
                <div className="w-full max-w-screen-xl">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="grid grid-cols-subgrid gap-6 col-span-3">
                            <div className="col-start-2">
                                <OtherPlayer
                                    playerName={"Player 1"}
                                    isTurn={false}
                                    numberOfCards={4}/>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <OtherPlayer
                                playerName={"Player 2"}
                                isTurn={false}
                                numberOfCards={2}/>
                        </div>
                        <div>
                            <div className="h-56 bg-slate-800 overflow-hidden bg-clip-border rounded-md">

                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <OtherPlayer
                                playerName={"Player 3"}
                                isTurn={true}
                                numberOfCards={7}/>
                        </div>
                        <div className="grid grid-cols-subgrid gap-6 col-span-3">
                            <div className="col-start-2">
                                <div className={`relative w-28 overflow-hidden bg-clip-border rounded-md`}>
                                    <Card card={card1}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Room;