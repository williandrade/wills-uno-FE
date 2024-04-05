import cardback from "../../../assets/cards/cardback.jpg";
import React from "react";
import {Avatar, Chip, Tooltip} from "@material-tailwind/react";
import {UnoCard} from "../../../types";
import {generateAvatarUrl} from "../../../common/helper";

interface state {
    numberOfCards: number;
    playerName: string;
    isTurn: boolean;
}

function OtherPlayer(props: state) {

    return (
        <div>
            <Tooltip content={props.playerName}>
                <div>
                    <Avatar
                        size="lg"
                        className={`shadow-md transition duration-100 transition-all ${props.isTurn ? 'border-solid border-2 border-blue-500' :'' }`}
                        variant="circular"
                        placeholder={props.playerName}
                        alt={props.playerName}
                        src={generateAvatarUrl()}
                    />
                    <Chip
                        className={`shadow bg-white text-black text-center -mt-2 rounded-full ${props.numberOfCards == 2 ? 'bg-amber-300' : props.numberOfCards <= 1 ? 'bg-deep-orange-500' : ''}`}
                        value={props.numberOfCards}/>
                </div>
            </Tooltip>
        </div>
    );
}

export default OtherPlayer;