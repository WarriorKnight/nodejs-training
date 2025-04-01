import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

let lastVisit = null;
let record = null;
let lastConnectionTime = null;
let visitCount = 0;
app.use(express.static('public'));


io.on('connection', (socket) => {
    const now = new Date();  
    lastVisit = now;
    visitCount++;

    if (lastConnectionTime) {
        const timeWithConnections = now - lastConnectionTime;
        if (timeWithConnections > record) {
            record = timeWithConnections;
        }
    }

    lastConnectionTime = now;

    socket.emit('lastVisit', lastVisit);
    socket.emit('visitCount', visitCount);
    socket.emit('record', record);

    socket.broadcast.emit('lastVisit', lastVisit);
    socket.broadcast.emit('visitCount', visitCount);

    console.log(`User connected. Updated last visit: ${lastVisit}`);
    console.log(`Current visit count: ${visitCount}`);

    socket.on('disconnect', () => {
        visitCount--;
        socket.broadcast.emit('visitCount', visitCount);
        console.log(`User disconnected. Current visit count: ${visitCount}`);
    });

  });

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
