import { io } from 'socket.io-client';

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempts: Infinity,
        timeout: 10000,  // 10 seconds timeout
        transports: ['websocket'],
    };

    const socket = io('http://localhost:5000', options);

    socket.on('connect', () => {
        console.log('Connected to server:', socket.id);
    });

    socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
    });

    return socket;
};
