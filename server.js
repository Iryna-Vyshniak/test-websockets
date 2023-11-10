// const express = require('express');
// const http = require('http');
// const WebSocket = new require('ws');
// const sqlite3 = require('sqlite3').verbose();
// const cors = require('cors');
// const { nanoid } = require('nanoid');

// const server = http.createServer(express);
// const wsServer = new WebSocket.Server({ server });

// const db = new sqlite3.Database('./clientdata.db', err => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Connection succsess');
//   }
// });

// const PORT = 3001;
// const PORT2 = 5000;

// db.run(
//   `CREATE TABLE IF NOT EXISTS info(
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT,
//     orgname TEXT,
//     datecreate TEXT,
//     )`,
//   err => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log('Table create success');
//     }
//   }
// );

// wsServer.on('connection', (ws, req) => {
//   ws.id = nanoid();
//   console.log(ws.id);

//   const ip = req.socket.remoteAddress;
//   console.log(`${ip} is now connected`);

//   ws.on('info', function incoming(data) {
//     const bytesString = String.fromCharCode(...data);
//     db.run(
//       `INSERT INTO info (id, name, orgname, datacreate) VALUES (?, ?, ?, ?)`,
//       [ws.id, bytesString],
//       function (err) {
//         console.log(err);
//       }
//     );
//     wsServer.clients.forEach(function each(client) {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(bytesString);
//       }
//     });
//   });
// });

// const app = express();

// app.use(cors());

// app.get('/', (req, res) => {
//   let arr = [];
//   db.all('SELECT * FROM info', (err, rows) => {
//     if (err) {
//       console.error(err);
//     } else {
//       rows.forEach(row => arr.push(row));
//       res.send(arr);
//     }
//   });
//   console.log('there was a get req');
// });

// // app.listen(PORT2);
// // server.listen(PORT);
// console.log(PORT, PORT2);
