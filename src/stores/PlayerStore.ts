import {create} from "zustand";
import {Player, UnoCard} from "../types";
import {useSocketStore} from "./SocketStore";
import _ from "lodash";

type Store = {
    player: Player,
    ready: () => void,
    setId: (id: string) => void,
    setName: (name: string) => void,
    setHand: (hand: UnoCard[]) => void,
    playCard: (card: UnoCard) => void,
    drawCard: (count: number) => void,
    callUno: () => void,
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
    },
    ready: () => {
        if (get().player.name.trim() !== '') {
            set((state) => ({player: {...state.player, isReady: true}}));
            useSocketStore.getState().connect();
            useSocketStore.getState().socket?.emit('joinRoom', {name: get().player.name});
        }
    },
    setId: (id: string) => set((state) => ({player: {...state.player, id}})),
    setName: (name: string) => set((state) => ({player: {...state.player, name}})),
    setHand: (hand: UnoCard[]) => set((state) => ({player: {...state.player, hand}})),
    playCard: (card: UnoCard) => {
        const {socket} = useSocketStore.getState();
        if (socket) {
            socket.emit('playCard', card);
            set((state) => ({
                player: {
                    ...state.player,
                    hand: (state.player.hand as UnoCard[]).filter(c => !_.isEqual(c, card))
                }
            }));
        }
    },
    drawCard: (count: number) => {
        const {socket} = useSocketStore.getState();
        if (socket) {
            socket.emit('drawCard', {count});
        }
    },
    callUno: () => {
        const {socket} = useSocketStore.getState();
        if (socket) {
            socket.emit('callUno');
        }
    },
}));

export {usePlayerStore};