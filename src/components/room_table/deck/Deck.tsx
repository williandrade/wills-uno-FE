import React from "react";
import './Deck.css';
import {UnoCard} from "../../../types";
import Card from "../../card/Card";
import uno from '../../../assets/uno-logo.svg';
import {Button} from "@material-tailwind/react";
import {usePlayerStore} from "../../../stores/PlayerStore";
import {useUnoStore} from "../../../stores/UnoStore";
import {useShallow} from "zustand/react/shallow";

function Deck() {
    const {isPlayerTurn} = useUnoStore();
    const {playCard} = usePlayerStore();

    const {cards, isTurn} = usePlayerStore(
        useShallow((state) => ({cards: state.player.hand, isTurn: state.player.isTurn})),
    );

    // Calculate the spread angle
    const maxSpreadAngle = -60; // Customize the total fan angle
    const angleIncrement = maxSpreadAngle / ((cards as UnoCard[]).length - 1);

    // Center the fan
    const offsetAngle = -maxSpreadAngle / 2;

    const unoAction = () => {
        //TODO: Implement UNO action
    }

    const discardCardAction = (card: UnoCard) => {
        if (!isTurn) return;
        playCard(card);
    }

    const getRotation = (i: number) => {
        if ((cards as UnoCard[]).length === 1) return 0;

        return i * angleIncrement + offsetAngle;
    }

    const isUnoTime = (cards as UnoCard[]).length === 2 && isTurn;

    const getArcValue = (index: number, maxIndex: number, maxValue: number) => {
        const normalizedInput = (index / maxIndex) * Math.PI;
        const sineValue = Math.sin(normalizedInput);
        const scaledValue = sineValue * maxValue;

        return scaledValue;
    }

    return (
        <div className="absolute -bottom-10">
            <div className="flex flex-col justify-center">
                <div className="flex justify-center flex-row-reverse">
                    {(cards as UnoCard[]).map((card, i) => (

                        <div
                            className={`play-card transition-all ease-in duration-300 bottom-0 relative w-44 -mx-12 overflow-hidden ${isTurn ? 'hover:bottom-5 cursor-pointer' : 'opacity-40'}`}
                            style={{
                                transform: `rotate(${getRotation(i)}deg)`,
                                bottom: `${getArcValue(i, (cards as UnoCard[]).length, 100)}px`
                            }}
                            onDoubleClick={() => discardCardAction(card)}>
                            <Card card={card}/>
                        </div>
                    ))}
                </div>
                {isUnoTime && <div className="flex justify-center">
                    <Button size="lg" color="white" className="flex bg-white/20 items-center p-2 mt-12"
                            placeholder={undefined} onClick={unoAction}>
                        <img src={uno} alt="UNO" className="h-24"/>
                    </Button>
                </div>}
            </div>
        </div>
    );
}

export default Deck;