import React from 'react';
import './Room.css';
import OtherPlayer from "../other_player/OtherPlayer";
import Deck from "../deck/Deck";
import Discard from "../discard/Discard";


function Room() {

    return (
        <>
            <div className="h-screen w-screen bg-slate-400 text-white flex pt-32 justify-center">
                <div className="w-full max-w-screen-xl">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="grid grid-cols-subgrid gap-6 col-span-3">
                            <div className="col-start-2">
                                <OtherPlayer
                                    playerName={""}
                                    isTurn={false}
                                    numberOfCards={0}/>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <OtherPlayer
                                playerName={""}
                                isTurn={false}
                                numberOfCards={0}/>
                        </div>
                        <div>
                            <Discard/>
                        </div>
                        <div className="flex justify-center items-center">
                            <OtherPlayer
                                playerName={""}
                                isTurn={false}
                                numberOfCards={0}/>
                        </div>
                        <div className="grid grid-cols-subgrid gap-6 col-span-3">
                            <div className="col-start-2 pt-12">
                                <Deck />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Room;