import cardback from "../../assets/cardback.jpg";
import React from "react";
import {Avatar} from "@material-tailwind/react";
import {UnoCard} from "../../types";

interface state {
    numberOfCards: number;
    playerName: string;
    isTurn: boolean;
}

function OtherPlayer(props: state) {

    // Calculate the spread angle
    const maxSpreadAngle = 120; // Customize the total fan angle
    const angleIncrement = maxSpreadAngle / (props.numberOfCards - 1);

    // Center the fan
    const offsetAngle = -maxSpreadAngle / 2;

    const getRotation = (i: number) => {
        if (props.numberOfCards === 1) return 0;

        return i * angleIncrement + offsetAngle;
    }

    const getArcValue = (index: number, maxIndex: number, maxValue: number) => {
        const normalizedInput = (index / maxIndex) * Math.PI;
        const sineValue = Math.sin(normalizedInput);
        const scaledValue = sineValue * maxValue;

        return scaledValue;
    }

    return (
        <>
            <div className="flex flex-col gap-3 items-center justify-center">
                <div className="flex-1 -mb-2">
                    <div className="flex flex-col items-center">
                        <div className={`text-md ${props.isTurn ? 'font-bold' : ''}`}>{props.playerName}</div>
                        {/*<div className="text-sm">7 cards</div>*/}
                    </div>
                </div>
                <Avatar className="w-44 h-44"
                        src={`https://api.dicebear.com/7.x/adventurer-neutral/svg?size=80&eyebrows=variant01,variant02,variant03&eyes=variant01,variant02,variant03&backgroundColor=f2d3b1&changeit=${Math.random()}`}
                        alt="avatar"
                        variant="rounded" placeholder={undefined}/>
                <div className="-mt-10 -ml-5">
                    <div className="flex-1 flex justify-center">
                        {Array.from({length: props.numberOfCards}).map((_, i) => (
                            <div
                                className={`relative transition-all w-16 -mx-5 first:ml-0 overflow-hidden ${props.isTurn ? 'shadow-lg' : 'shadow-md'} bg-clip-border rounded-md ${props.isTurn ? 'shadow-blue-gray-500' : 'shadow-blue-gray-500/40'}`}
                                style={{
                                    transform: `rotate(${getRotation(i)}deg)`,
                                    bottom: `${getArcValue(i, props.numberOfCards - 1, 20)}px`
                                }}>
                                <img src={cardback} alt="card"/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default OtherPlayer;