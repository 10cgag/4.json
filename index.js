const { WebSocketServer } = require('ws');

const port = process.env.PORT || 8080;
const wss = new WebSocketServer({ port });

console.log(`WebSocket server is running on port ${port}`);

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === ws.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
