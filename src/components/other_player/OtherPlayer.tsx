import cardback from "../../assets/cardback.jpg";
import React from "react";

interface state {
    numberOfCards: number;
    playerName: string;
    isTurn: boolean;
}

function OtherPlayer(props: state) {

    return (
        <>
            <div className="flex flex-col gap-3">
                <div className="flex-1 flex justify-center">
                    {Array.from({length: props.numberOfCards}).map((_, i) => (
                        <div
                            className={`relative w-16 -mx-5 first:ml-0 overflow-hidden ${props.isTurn ? 'shadow-lg' : 'shadow-md'} bg-clip-border rounded-md ${props.isTurn ? 'shadow-blue-gray-500' : 'shadow-blue-gray-500/40'}`}>
                            <img src={cardback} alt="card"/>
                        </div>
                    ))}
                </div>
                <div className="flex-1">
                    <div className="flex flex-col items-center">
                        <div className={`text-md ${props.isTurn ? 'font-bold': ''}`}>{props.playerName}</div>
                        {/*<div className="text-sm">7 cards</div>*/}
                    </div>
                </div>
            </div>
        </>
    );
}

export default OtherPlayer;