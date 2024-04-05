import * as animationData from "../../assets/deck-animation/data.json";
import Lottie from "react-lottie";
import React from "react";

function Loader() {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {},
    };

    return (
        <div className="loader fixed w-full h-full z-20 flex justify-center">
            <div className="w-1/4 center">
                <Lottie options={defaultOptions} segments={[0, 2]}/>
            </div>
        </div>
    );
}

export default Loader;