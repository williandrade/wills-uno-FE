import {create} from "zustand";
import {Player, UnoCard} from "../types";
import {useSocketStore} from "./SocketStore";

type Store = {
    player: Player,
    ready: () => void,
    setId: (id: string) => void,
    setName: (name: string) => void,
    setHand: (hand: UnoCard[]) => void,
    playCard: (card: UnoCard) => void,
    drawCard: (card: UnoCard) => void,
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
        if(get().player.name.trim() !== ''){
            set((state) => ({player: {...state.player, isReady: true}}));
            useSocketStore.getState().connect();
        }
    },
    setId: (id: string) => set((state) => ({player: {...state.player, id}})),
    setName: (name: string) => set((state) => ({player: {...state.player, name}})),
    setHand: (hand: UnoCard[]) => set((state) => ({player: {...state.player, hand}})),
    playCard: (card: UnoCard) => set((state) => ({

        player: {
            ...state.player,
            hand: state.player.hand.filter((c) => c !== card)
        }

    })),
    drawCard: (card: UnoCard) => set((state) => ({player: {...state.player, hand: [...state.player.hand, card]}})),
    callUno: () => set((state) => ({player: {...state.player, isUno: true}})),
}));

export {usePlayerStore};