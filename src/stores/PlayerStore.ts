import {create} from "zustand";
import {matchCard, Player, UnoCard} from "../types";
import {useSocketStore} from "./SocketStore";
import _ from "lodash";
import {LOCAL_STORAGE_NAME_KEY} from "../common/constants";
import {useUnoStore} from "./UnoStore";

type Store = {
    player: Player,
    ready: () => void,
    setDefault: (user: Player) => void,
    setName: (name: string) => void,
    setHand: (hand: UnoCard[]) => void,
    playCard: (card: UnoCard) => void,
    drawCard: () => void,
    callUno: () => void,
    missedUno: () => void,
}

const usePlayerStore = create<Store>()((set, get) => ({
    player: {
        id: '',
        name: '',
        hand: [],
        isHost: false,
        isReady: false,
        isTurn: false,
        isUno: false,
        isSpectator: false,
        needsToBuy: 0,
    },
    ready: () => {
        if (get().player.name.trim() !== '') {
            set((state) => ({player: {...state.player, isReady: true}}));
            useSocketStore.getState().connect();
            useSocketStore.getState().socket?.emit('joinRoom', {name: get().player.name});
        }
    },
    setDefault: (user: Player) => set((state) => ({
        player: {
            ...state.player,
            id: user.id,
            // name: user.name,
            // hand: user.hand,
            isHost: user.isHost,
            // isReady: user.isReady,
            isTurn: user.isTurn,
            isUno: user.isUno,
            isSpectator: user.isSpectator,
            needsToBuy: user.needsToBuy,
        }
    })),
    setName: (name: string) => set((state) => {
        document.title = `${name} - UNO Game`
        localStorage.setItem(LOCAL_STORAGE_NAME_KEY, name);
        return ({player: {...state.player, name}});
    }),
    setHand: (hand: UnoCard[]) => set((state) => ({player: {...state.player, hand}})),
    playCard: (card: UnoCard) => {
        const {socket} = useSocketStore.getState();
        if (socket) {
            socket.emit('playCard', {
                card
            });

            set((state) => {
                const cards = (state.player.hand as UnoCard[]);
                const cardIndex = cards.findIndex(c => matchCard(c, card));
                if (cardIndex !== -1) {
                    cards.splice(cardIndex, 1);
                }

                return {
                    player: {
                        ...state.player,
                        hand: cards
                    }
                }
            });
        }
    },
    drawCard: () => {
        const {socket} = useSocketStore.getState();
        const {player} = usePlayerStore.getState();
        if (socket) {
            socket.emit('drawCard', {count: player.needsToBuy ?? 1});
        }
    },
    callUno: () => {
        const {socket} = useSocketStore.getState();
        if (socket) {
            socket.emit('callUno');
        }
    },
    missedUno: () => {
        const {socket} = useSocketStore.getState();
        if (socket) {
            socket.emit('missedUno');
        }
    }
}));

export {usePlayerStore};