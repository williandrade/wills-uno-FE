import {create} from "zustand";
import {Player, UnoCard} from "../types";

type Store = {
    player: Player,
    setId: (id: string) => void,
    setName: (name: string) => void,
    setHand: (hand: UnoCard[]) => void,
    playCard: (card: UnoCard) => void,
    drawCard: (card: UnoCard) => void,
    callUno: () => void,
}

const usePlayerStore = create<Store>()((set) => ({
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

export default usePlayerStore;