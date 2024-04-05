import {create} from "zustand";
import {io, Socket} from 'socket.io-client';
import {toast} from "react-toast";
import {GameState, Player, UnoCard, UnoRoom} from "../types";
import {useUnoStore} from "./UnoStore";
import {usePlayerStore} from "./PlayerStore";

type Store = {
    socket?: Socket | null,
    isConnected: boolean,
    errorMessage: string,
    notificationMessage: string,
    connect: () => void,
}

const BE_URL = 'localhost:3000';

const useSocketStore = create<Store>()((set, get) => ({
    socket: null,
    isConnected: false,
    errorMessage: '',
    notificationMessage: '',
    connect: () => {
        const socket = io(BE_URL);

        socket.on('connect', () => {
            set({socket, isConnected: true});
        });
        socket.on('disconnect', () => {
            set({socket, isConnected: false});
        });

        // EVENTS
        socket.on('error', (message) => {
            console.log('::EVENT::error', message)
            toast.error(message);
            set({socket, errorMessage: message});
        });

        socket.on('notification', (message) => {
            console.log('::EVENT::notification', message)
            toast.info(message);
            set({socket, notificationMessage: message});
        });

        socket.on('roomJoined', (message: UnoRoom) => {
            console.log('::EVENT::roomJoined', message)
            try {
                message.players = message.players.filter(p => {
                    if (p.name === usePlayerStore.getState().player.name) {
                        usePlayerStore.getState().setDefault(p);
                    }

                    return p.name !== usePlayerStore.getState().player.name;
                });
            } catch (e) {
            }
            useUnoStore.setState(message);
        });

        socket.on('playerJoined', (message: Player) => {
            console.log('::EVENT::playerJoined', message)
            if (message.name !== usePlayerStore.getState().player.name) {
                useUnoStore.setState({
                    ...useUnoStore.getState(),
                    players: [...useUnoStore.getState().players, message]
                });
            }
        });

        socket.on('playerLeft', (message: Player) => {
            console.log('::EVENT::playerLeft', message)
            useUnoStore.setState({
                ...useUnoStore.getState(),
                players: useUnoStore.getState().players.filter(p => p.id !== message.id)
            });
        });

        socket.on('gameStarted', (message: GameState) => {
            console.log('::EVENT::gameStarted', message)
            useUnoStore.setState({
                ...useUnoStore.getState(),
                gameState: message
            });
        });

        socket.on('cardsOn', (message: UnoCard[]) => {
            console.log('::EVENT::cardsOn', message)
            usePlayerStore.getState().setHand(message);
        });

        socket.on('gameUpdate', (message: GameState) => {
            console.log('::EVENT::gameUpdate', message)
            useUnoStore.setState({
                ...useUnoStore.getState(),
                gameState: message
            });
        });

        socket.on('playersCountUpdate', (message: Player[]) => {
            console.log('::EVENT::playersCountUpdate', message)
            try {
                message = message.filter(p => {
                    if (p.name === usePlayerStore.getState().player.name) {
                        usePlayerStore.getState().setDefault(p);
                    }

                    return p.name !== usePlayerStore.getState().player.name;
                });
            } catch (e) {
            }

            useUnoStore.setState({
                ...useUnoStore.getState(),
                players: message
            });
        });

        socket.on('cardDrawn', (message: UnoCard[]) => {
            console.log('::EVENT::cardDrawn', message)
            usePlayerStore.getState().setHand(message);
        });

        socket.on('unoCalled', (message: GameState) => {
            console.log('::EVENT::unoCalled', message)
            useUnoStore.setState({
                ...useUnoStore.getState(),
                gameState: message
            });
        });

        set({socket, isConnected: true});
    }
}));

export {useSocketStore};