import {create} from "zustand";
import {UnoCard, UnoRoom} from "../types";
import {useSocketStore} from "./SocketStore";
import {usePlayerStore} from "./PlayerStore";

type Store = UnoRoom & {
    isUserTurn: (userId: string) => boolean;
    hasUsers: () => boolean;
    startGame: () => void;
    isPlayerTurn: (playerId: string) => boolean;
    canPlayCard: (card: UnoCard) => boolean;
};

const useUnoStore = create<Store>()((set, get) => ({
    roomId: "",
    roomName: "",
    players: [],
    gameState: {
        deck: [],
        discardPile: [],
        currentPlayerId: "",
        direction: {
            value: 1,
        },
        winnerId: "",
        isOver: false,
        isStarted: false,
        isPaused: false,
        isUnoCall: false,
    },
    maxPlayers: 10,
    options: {},
    isUserTurn: (userId: string) => {
        return userId === get().gameState.currentPlayerId;
    },
    hasUsers: () => {
        return get().players.length > 0;
    },
    startGame: () => {
        const {socket} = useSocketStore.getState();
        if (socket) {
            socket.emit('startGame');
        }
    },
    isPlayerTurn: (playerId: string) => {
        return get().gameState.currentPlayerId === playerId;
    },
    canPlayCard: (card: UnoCard) => {
        const turnedCard = get().gameState.discardPile[get().gameState.discardPile.length - 1];
        const player = usePlayerStore.getState().player;

        if (!player?.isTurn) {
            // Not player's turn
            if (card.color === turnedCard.color
                && card.value === turnedCard.value) {
                return true;
            }

            return false;
        }

        if (card.color === turnedCard.color
            || card.value === turnedCard.value
            || card.color === null) {
            return true;
        }

        return false;
    }
}));

export {useUnoStore};
