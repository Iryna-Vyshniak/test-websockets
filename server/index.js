const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const bodyParser = require('body-parser');

const ctrl = require('./controllers');

// Adding BodyParser to parse the body of POST requests.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use(express.static('../public'));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

// PORTs
const HTTP_PORT = process.env.PORT || 5000;

const httpServer = http.createServer(app);

const wsServer = new WebSocket.Server({ server: httpServer });

httpServer.listen(HTTP_PORT, () => {
  console.log(`HTTP Server running on port: ${HTTP_PORT}`);
});

//  Websocket

function heartbeat() {
  this.isAlive = true;
}

wsServer.on('connection', ws => {
  ws.isAlive = true;

  console.log('WebSocket connected');

  const numClients = wsServer.clients.size;
  console.log(`Clients connected: ${numClients}`);

  ws.on('message', async message => {
    const parsedMessage = JSON.parse(message);

    switch (parsedMessage.event) {
      case 'getAllInfo':
        try {
          const rows = await ctrl.getAllInfo();
          ws.send(JSON.stringify({ event: 'getAllInfo', data: rows }));
        } catch (error) {
          console.error(error);
        }
        break;

      case 'addInfoCard':
        try {
          const insertedInfo = await ctrl.addInfoCard(parsedMessage.data);
          ws.send(JSON.stringify({ event: 'addInfoCard', data: insertedInfo }));
        } catch (error) {
          console.error(error);
        }
        break;

      case 'editInfoCard':
        try {
          const updatedInfo = await ctrl.editInfoCard(parsedMessage.data);
          ws.send(JSON.stringify({ event: 'editInfoCard', data: updatedInfo }));
        } catch (error) {
          console.error(error);
        }
        break;

      case 'editNameCard':
        try {
          const updatedInfo = await ctrl.editNameCard(parsedMessage.data);
          ws.send(JSON.stringify({ event: 'editNameCard', data: updatedInfo }));
        } catch (error) {
          console.error(error);
        }
        break;

      case 'getInfoCardById':
        try {
          const id = parsedMessage.data.id;
          const info = await ctrl.getInfoById(id);
          ws.send(JSON.stringify({ event: 'getInfoCardById', data: info }));
        } catch (error) {
          console.error(error);
        }
        break;

      default:
        ws.send(JSON.stringify({ event: 'error', payload: 'Invalid event' }));
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
