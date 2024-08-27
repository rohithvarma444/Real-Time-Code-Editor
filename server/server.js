const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const ACTIONS = require('./action'); // Ensure this path is correct

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
};

app.use(cors(corsOptions));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    }
});

const userSocketMap = {};

io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    function getAllConnectedClients(teamId) {
        return Array.from(io.sockets.adapter.rooms.get(teamId) || []).map(
            (socketId) => {
                return {
                    socketId,
                    username: userSocketMap[socketId],
                };
            }
        );
    }

    socket.on(ACTIONS.JOIN, ({ teamId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(teamId);

        const clients = getAllConnectedClients(teamId);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            });
        });

        console.log(`${username} joined team ${teamId}`);
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
        const rooms = Array.from(socket.rooms);
        rooms.forEach((roomId) => {
            socket.leave(roomId);
            const clients = getAllConnectedClients(roomId);
            clients.forEach(({ socketId }) => {
                io.to(socketId).emit(ACTIONS.DISCONNECTED, {
                    socketId: socket.id,
                    username: userSocketMap[socket.id],
                });
            });
        });
        delete userSocketMap[socket.id];
    });
});

server.on('error', (error) => {
    console.error('Server error:', error);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
