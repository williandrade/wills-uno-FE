import React, {useEffect, useState} from "react";
import {UnoCard} from "../../types";

interface state {
    card: UnoCard,
}

function Card(props: state) {
    // const LazyIcon = lazy(() => {
    //     return import(`../../assets/${props.card.color? props.card.color?.toLowerCase() + '-' : ''}${props.card.value.toLowerCase()}.svg`);
    // });


    const [cardImage, setCardImage] = useState('');

    useEffect(() => {
        const getCardImport = () => {
            return '../../assets/blue-0.svg';
            // return `../../assets/${props.card.color? props.card.color?.toLowerCase() + '-' : ''}${props.card.value.toLowerCase()}.svg`;
        }

        const image = require(getCardImport()) as String;
        setCardImage(`${image}`);
        // import(getCardImport())
        //     .then((image) => {
        //         setCardImage(image);
        //     })
        //     .catch((error) => {
        //         console.error(`Error loading image: ${error}`);
        //     });
    }, [props.card]);


    return (
        <>
            {/*<img src={require(getCardImport())} alt="card"/>*/}
            {/*<img src={require(getCardImport()) as string} alt="card"/>*/}
            {/*<Suspense>*/}
                <img src={cardImage} alt="card"/>
                {/*<LazyIcon />*/}
            {/*</Suspense>*/}
        </>
    );
}

export default Card;