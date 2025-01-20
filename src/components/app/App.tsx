import React, {useEffect} from "react";
import "./App.css";
import Loby from "../loby/Loby";
import Room from "../room/Room";
import {usePlayerStore} from "../../stores/PlayerStore";
import {useSocketStore} from "../../stores/SocketStore";
import {useUnoStore} from "../../stores/UnoStore";
import AwaitingRoom from "../awaiting_room/AwaitingRoom";
import {useShallow} from "zustand/react/shallow";

function App() {
    const isReady = usePlayerStore(useShallow((state) => state.player.isReady));
    const isConnected = useSocketStore(useShallow((state) => state.isConnected));
    const {hasUsers, isStarted} = useUnoStore(
        useShallow((state) => ({hasUsers: state.hasUsers, isStarted: state.gameState.isStarted})),
        (old, current) => old.hasUsers === current.hasUsers && old.isStarted === current.isStarted,
    );

    const [isDark, setIsDark] = React.useState(false);

    useEffect(() => {
        const mq = window.matchMedia(
            "(prefers-color-scheme: dark)"
        );

        if (mq.matches) {
            setIsDark(true);
        }

        mq.addEventListener("change", (evt) => setIsDark(evt.matches));
    }, []);

    return (
        <div className={`${isDark ? 'dark' : ''}`}>
            <div className="bg-white dark:bg-black">
                {!isReady && <Loby/>}
                {isReady && !isStarted && <AwaitingRoom/>}
                {isConnected && hasUsers() && isStarted && <Room/>}
            </div>
        </div>
    );
}

export default App;
