import {create} from "zustand";
import {Direction, UnoCard, UnoRoom} from "../types";

type Store = UnoRoom  & {
    isUserTurn: (userId: string) => boolean;
}

const useUnoStore = create<Store>()((set, get) => ({
    roomId: '',
    roomName: '',
    players: [],
    gameState: {
        deck: [],
        discardPile: [],
        currentPlayerId: '',
        direction: {
            value: 1
        },
        winnerId: '',
        isOver: false,
        isStarted: false,
        isPaused: false,
        isUnoCall: false,
    },
    maxPlayers: 10,
    options: {},
    isUserTurn: (userId: string) => {
        return userId === get().gameState.currentPlayerId;
    }
}))

export {useUnoStore};