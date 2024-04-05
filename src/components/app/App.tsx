import React from "react";
import "./App.css";
import Loby from "../loby/Loby";
import Room from "../room/Room";
import { usePlayerStore } from "../../stores/PlayerStore";
import { useSocketStore } from "../../stores/SocketStore";
import { useUnoStore } from "../../stores/UnoStore";
import AwaitingRoom from "../awaiting_room/AwaitingRoom";
import {useShallow} from "zustand/react/shallow";

function App() {
  const isReady = usePlayerStore(useShallow((state) => state.player.isReady));
  const isConnected = useSocketStore(useShallow((state) => state.isConnected));
  const {hasUsers, isStarted} = useUnoStore(
      useShallow((state) => ({hasUsers: state.hasUsers, isStarted: state.gameState.isStarted})),
      (old, current) => old.hasUsers === current.hasUsers && old.isStarted === current.isStarted,
  );

  return (
    <>
      {!isReady && <Loby />}
      {isReady && !isStarted && <AwaitingRoom />}
      {isConnected && hasUsers() && isStarted && <Room />}
    </>
  );
}

export default App;
