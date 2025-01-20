import React from "react";
import {UnoCard} from "../../types";

import blue0 from "../../assets/cards/blue-0.svg";
import blue1 from "../../assets/cards/blue-1.svg";
import blue2 from "../../assets/cards/blue-2.svg";
import blue3 from "../../assets/cards/blue-3.svg";
import blue4 from "../../assets/cards/blue-4.svg";
import blue5 from "../../assets/cards/blue-5.svg";
import blue6 from "../../assets/cards/blue-6.svg";
import blue7 from "../../assets/cards/blue-7.svg";
import blue8 from "../../assets/cards/blue-8.svg";
import blue9 from "../../assets/cards/blue-9.svg";
import bluedrawtwo from "../../assets/cards/blue-drawTwo.svg";
import bluereverse from "../../assets/cards/blue-reverse.svg";
import blueskip from "../../assets/cards/blue-skip.svg";
import cardback from "../../assets/cards/back.svg";
import green0 from "../../assets/cards/green-0.svg";
import green1 from "../../assets/cards/green-1.svg";
import green2 from "../../assets/cards/green-2.svg";
import green3 from "../../assets/cards/green-3.svg";
import green4 from "../../assets/cards/green-4.svg";
import green5 from "../../assets/cards/green-5.svg";
import green6 from "../../assets/cards/green-6.svg";
import green7 from "../../assets/cards/green-7.svg";
import green8 from "../../assets/cards/green-8.svg";
import green9 from "../../assets/cards/green-9.svg";
import greendrawtwo from "../../assets/cards/green-drawTwo.svg";
import greenreverse from "../../assets/cards/green-reverse.svg";
import greenskip from "../../assets/cards/green-skip.svg";
import red0 from "../../assets/cards/red-0.svg";
import red1 from "../../assets/cards/red-1.svg";
import red2 from "../../assets/cards/red-2.svg";
import red3 from "../../assets/cards/red-3.svg";
import red4 from "../../assets/cards/red-4.svg";
import red5 from "../../assets/cards/red-5.svg";
import red6 from "../../assets/cards/red-6.svg";
import red7 from "../../assets/cards/red-7.svg";
import red8 from "../../assets/cards/red-8.svg";
import red9 from "../../assets/cards/red-9.svg";
import reddrawtwo from "../../assets/cards/red-drawTwo.svg";
import redreverse from "../../assets/cards/red-reverse.svg";
import redskip from "../../assets/cards/red-skip.svg";
import wild from "../../assets/cards/wild.svg";
import wilddrawfour from "../../assets/cards/wildDrawFour.svg";
import yellow0 from "../../assets/cards/yellow-0.svg";
import yellow1 from "../../assets/cards/yellow-1.svg";
import yellow2 from "../../assets/cards/yellow-2.svg";
import yellow3 from "../../assets/cards/yellow-3.svg";
import yellow4 from "../../assets/cards/yellow-4.svg";
import yellow5 from "../../assets/cards/yellow-5.svg";
import yellow6 from "../../assets/cards/yellow-6.svg";
import yellow7 from "../../assets/cards/yellow-7.svg";
import yellow8 from "../../assets/cards/yellow-8.svg";
import yellow9 from "../../assets/cards/yellow-9.svg";
import yellowdrawtwo from "../../assets/cards/yellow-drawTwo.svg";
import yellowreverse from "../../assets/cards/yellow-reverse.svg";
import yellowskip from "../../assets/cards/yellow-skip.svg";

const cardImages = {
    'blue0': blue0,
    'blue1': blue1,
    'blue2': blue2,
    'blue3': blue3,
    'blue4': blue4,
    'blue5': blue5,
    'blue6': blue6,
    'blue7': blue7,
    'blue8': blue8,
    'blue9': blue9,
    'bluedrawtwo': bluedrawtwo,
    'bluereverse': bluereverse,
    'blueskip': blueskip,
    'cardback': cardback,
    'green0': green0,
    'green1': green1,
    'green2': green2,
    'green3': green3,
    'green4': green4,
    'green5': green5,
    'green6': green6,
    'green7': green7,
    'green8': green8,
    'green9': green9,
    'greendrawtwo': greendrawtwo,
    'greenreverse': greenreverse,
    'greenskip': greenskip,
    'red0': red0,
    'red1': red1,
    'red2': red2,
    'red3': red3,
    'red4': red4,
    'red5': red5,
    'red6': red6,
    'red7': red7,
    'red8': red8,
    'red9': red9,
    'reddrawtwo': reddrawtwo,
    'redreverse': redreverse,
    'redskip': redskip,
    'wild': wild,
    'wilddrawfour': wilddrawfour,
    'yellow0': yellow0,
    'yellow1': yellow1,
    'yellow2': yellow2,
    'yellow3': yellow3,
    'yellow4': yellow4,
    'yellow5': yellow5,
    'yellow6': yellow6,
    'yellow7': yellow7,
    'yellow8': yellow8,
    'yellow9': yellow9,
    'yellowdrawtwo': yellowdrawtwo,
    'yellowreverse': yellowreverse,
    'yellowskip': yellowskip
}

interface state {
    card?: UnoCard,
}

function Card(props: state) {
    const getCardImport = () => {
        if(!props.card) {
            return cardImages.cardback;
        }

        const name = `${!['wild', 'wilddrawfour'].includes(props.card.value.toLowerCase()) ? props.card.color?.toLowerCase() + '' : ''}${props.card.value.toLowerCase()}`;
        return cardImages[name as keyof object];
    }

    return (
        <img src={getCardImport()} alt="card"/>
    );
}

export default Card;