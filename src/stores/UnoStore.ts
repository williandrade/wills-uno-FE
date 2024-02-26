import {create} from "zustand";
import {UnoCard} from "../types";

type Store = {
    discardPile: UnoCard[],
    currentPlayerId: null,
    direction: {value: 1},
    discardCard: (card: UnoCard) => void,
}

const useUnoStore = create<Store>()((set) => ({
    discardPile: [],
    discardCard: (card) => set((state) => ({discardPile: [...state.discardPile, card]}))
}))

export {useUnoStore};