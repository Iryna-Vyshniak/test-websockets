const express = require('express');
const cors = require('cors');
const http = require('http');
const { WebSocketServer } = require('ws');

const app = express();
const bodyParser = require('body-parser');
const infoRouter = require('./routes/api/info');

// const corsOptions = {
//   origin: ['http://localhost:3000', 'https://iryna-vyshniak.github.io'],
//   optionsSuccessStatus: 200
// };

// Adding BodyParser to parse the body of POST requests.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/test', infoRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

// PORTs
const HTTP_PORT = process.env.PORT || 5000;
const WS_PORT = process.env.WS_PORT || 8080;

const httpServer = http.createServer(app);
const wsServer = new WebSocketServer({ port: WS_PORT });

httpServer.listen(HTTP_PORT, () => {
  console.log(`HTTP Server running on port: ${HTTP_PORT}`);
});

console.log(`WebSocket Server running on port: ${WS_PORT}`);

//  Websocket

function heartbeat() {
  this.isAlive = true;
}

wsServer.on('connection', (ws, req) => {
  ws.isAlive = true;

  const numClients = wsServer.clients.size;
  console.log(`Clients connected: ${numClients}`);

  if (ws.readyState === ws.OPEN) {
    ws.send('Welcome to my server');
  }

  ws.on('message', message => {
    const parsedMessage = JSON.parse(message);

    if (parsedMessage.event === 'message') {
      console.log(`Received message: ${parsedMessage.payload}`);
    }

    if (parsedMessage.event === 'createUser') {
      console.log(`Created user: ${JSON.stringify(parsedMessage.payload)}`);
    }
  });

  ws.on('error', console.error);
  ws.on('pong', heartbeat);
});

const interval = setInterval(function ping() {
  wsServer.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wsServer.on('close', function close() {
  console.log('WebSocket connection closed');
  clearInterval(interval);
});
