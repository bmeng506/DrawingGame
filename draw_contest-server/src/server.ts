import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import type { Socket } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const PORT = 3001;

let players: string[] = [];

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running!');
});

io.on('connection', (socket: Socket) => {
    console.log('Player connected:', socket.id);
    players.push(socket.id);

    // When a player draws, broadcast to everyone else
    socket.on('draw', (data: { x: number; y: number; isStart: boolean}) => {
        socket.broadcast.emit('draw', data);
    });

    socket.on('disconnect', () => {
        console.log('Player disconnected:', socket.id);
        players = players.filter(id => id !== socket.id);
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});