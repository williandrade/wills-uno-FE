import React from "react";
import Card from "../card/Card";
import {useUnoStore} from "../../stores/UnoStore";

function Discard() {
    const discardPile = useUnoStore((state) => state.discardPile);

    const angleIncrement = 25 / 3;

    // ray of cards in the discard pile
    return (
        <div className="h-56 overflow-hidden bg-clip-border rounded-md flex justify-center items-center">
            <div className="relative w-28 h-36">
                {discardPile.slice(-4).map((card, i) => (
                    <div
                        className={`play-card transition-all w-28 overflow-hidden absolute`}
                        style={{transform: `rotate(${i * angleIncrement * (i % 2 ? 1 : -1)}deg)`}}>
                        <Card card={card}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Discard;