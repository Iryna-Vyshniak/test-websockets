const express = require('express');
const cors = require('cors');
const http = require('http');
const { WebSocketServer } = require('ws');

const app = express();
const bodyParser = require('body-parser');
const db = require('./db.js');

const corsOptions = {
  origin: ['http://localhost:3000', 'https://iryna-vyshniak.github.io'],
  optionsSuccessStatus: 200
};

// Adding BodyParser to parse the body of POST requests.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: '*' }));

// ROOT ENDPOINT
app.get('/test', (req, res, next) => {
  res.json({ message: 'Ok' });
});

// GET ALL CARD INFO
app.get('/test/info', cors(corsOptions), (req, res, next) => {
  db.all('SELECT id, name, orgname, datecreate FROM info ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      console.error('Error retrieving data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Data retrieved successfully');
      res.status(200).json(rows);
    }
  });
});

// GET ONE INFO CARD BY ID
app.get('/test/info/:id', cors(corsOptions), (req, res, next) => {
  const query = `SELECT * FROM info WHERE id = ?;`;
  const params = [req.params.id];
  return db.each(query, params, (err, row) => {
    if (err) {
      res.status(400).json({ status: 'bad', error: err });
      return;
    }
    res.status(200);
    res.json({
      message: 'success',
      data: row
    });
  });
});

// CREATE NEW INFO CARD
app.post('/test/add', cors(corsOptions), (req, res, next) => {
  const data = req.body.data;

  const errors = [];

  if (!data.name || !data.orgname || !data.datecreate) {
    errors.push('No name specified');
    res.status(500).json({ error: 'No name specified' });
    return;
  }

  // Modify all the query
  // const query = `INSERT INTO info (name, orgname, datecreate) VALUES (?,?,?);`;
  // const params = [data.name, data.orgname, data.datecreate];

  // Modify the query to include the current date
  const query = `INSERT INTO info (name, orgname, datecreate) VALUES (?, ?, CURRENT_DATE);`;
  const params = [data.name, data.orgname];

  db.run(query, params, function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error inserting data into the database' });
      return;
    }

    res.status(201).json({
      message: 'success',
      data,
      id: this.lastID
    });
  });
});

// EDIT INFO by ID all fields
app.patch('/test/edit/:id', cors(corsOptions), (req, res, next) => {
  const id = req.params.id;
  const data = {
    name: req.body.name,
    orgname: req.body.orgname,
    datecreate: req.body.datecreate
  };

  const query = `UPDATE info SET
    name = COALESCE(?, name),
    orgname = COALESCE(?, orgname),
    datecreate = COALESCE(?, datecreate)
    WHERE id = ?;`;

  const params = [data.name, data.orgname, data.datecreate, id];

  return db.run(query, params, function (err, result) {
    if (err) {
      res.status(500).json({ status: 'bad', error: err.message });
      return;
    }
    res.status(200);
    res.json({
      message: 'success',
      data,
      changes: this.changes
    });
  });
});

// EDIT INFO by ID all only name
app.patch('/test/edit-name/:id', cors(corsOptions), (req, res, next) => {
  const id = req.params.id;
  const data = {
    name: req.body.name
  };

  const query = `UPDATE info SET
    name = COALESCE(?, name)
    WHERE id = ?;`;

  const params = [data.name, id];

  return db.run(query, params, function (err, result) {
    if (err) {
      res.status(500).json({ status: 'bad', error: err.message });
      return;
    }
    res.status(200);
    res.json({
      message: 'success',
      data,
      changes: this.changes
    });
  });
});

// ------------------------------------------------------------------------

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
