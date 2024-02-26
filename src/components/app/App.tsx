import React from 'react';
import './App.css';
import Loby from "../loby/Loby";
import Room from "../room/Room";
import {usePlayerStore} from "../../stores/PlayerStore";
import {ToastContainer} from "react-toast";
import {useSocketStore} from "../../stores/SocketStore";

function App() {
    const isReady = usePlayerStore((state) => state.player.isReady);
    const isConnected = useSocketStore((state) => state.isConnected);

    return (
        <div>
            {!isReady && <Loby />}
            {!isConnected && <div>Connecting...</div>}
            {isConnected && <Room/>}
            <ToastContainer position={"top-center"} />
        </div>
    );
}

export default App;
