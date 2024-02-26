import {create} from "zustand";
import {io, Socket} from 'socket.io-client';
import {toast} from "react-toast";
import {UnoRoom} from "../types";

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
            toast.error(message);
            set({socket, errorMessage: message});
        });

        socket.on('notification', (message) => {
            toast.info(message);
            set({socket, notificationMessage: message});
        });

        socket.on('roomJoined', (message: UnoRoom) => {
            message.gameState.discardPile;
        });
    }
}));

export {useSocketStore};