import * as express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('create', (room: string) => {
    console.log(`Creating room ${room}`);
    socket.join(room);
    socket.emit('created', room);
  });

  socket.on('join', (room: string) => {
    console.log(`Client joined room ${room}`);
    socket.join(room);
  });

  /* socket.on('leave', () => {
    console.log('Client left room');
    socket.leaveAll();
  }); */

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

httpServer.listen(3000, () => {
  console.log('Express listening on port 3000');
});



/*
import * as express from 'express'
import * as cors from 'cors';
import * as sqlite3 from 'sqlite3';




const app = express();



app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200'  }));
 */
/* // Open a SQLite database, stored in the file db.sqlite
const db = new sqlite3.Database('./db.sqlite');
db.run(`CREATE TABLE IF NOT EXISTS rooms (
  id TEXT PRIMARY KEY,
  name TEXT
)`);
 */

// custom error handling
/* class CustomError extends Error {
  public status: number;
  public data: any;

  constructor(message: string, status: number, data: any) {
    super(message);
    this.name = 'CustomError';
    this.status = status;
    this.data = data;
  }
}
 */



/* const rooms: { [id: string]: { name: string } } = {}; */


//Here, we first retrieve the roomName and roomId parameters from the query string.
//Then, we check which parameter was provided in the request.
//If roomName is present, we use an INSERT statement to insert a new row into the rooms table with the provided roomName.
//If roomId is present, we use an INSERT statement to insert a new row into the rooms table with the provided roomId.
//Finally, we send a response with a 201 status code and the roomId and roomName values, regardless of which parameter was provided in the request.
/* app.post('/api/rooms', async (req, res) => {
  const { roomName, roomId } = req.body;
  console.log(`${req.body}`);

  // Return an error if neither roomName nor roomId is provided
  if (!roomName && !roomId) {
    res.status(400).send({ message: 'Missing roomName or roomId' });
    return;
  }

  try {
    let statement;
    if (roomName) {
      // Insert room with name
      statement = db.prepare(`INSERT INTO rooms (name, id) VALUES (? , ?)`);
      statement.run(roomName);
    } else if (roomId) {
      // Insert room with id
      statement = db.prepare(`INSERT INTO rooms (name , id) VALUES (? , ?)`);
      statement.run('',roomId);
    }
    statement.finalize();
    res.status(201).json({ roomId, roomName });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status).send({ message: error.message, data: error.data });
    } else {
      res.status(500).send({ message: 'here is the post error' });
    }
  }
});
 */
/* //simple rate limitter to request only one room param at a time.
let requestMade = false;

app.get(`/rooms/:id`, async (req, res) => {
  console.log(`Route params:`, req.params);
  if (requestMade) {
    return res.status(400).send({ message: 'Too many requests' });
  }
  requestMade = true;
  const roomId = req.params.id;


  console.log(`Retrieving room with id: ${roomId}`);
  db.get(`SELECT * FROM rooms WHERE id = ?`, [roomId], (error, row) => {
    if (error) {
      console.error(`Error executing statement: ${error.message}`);
      return res.status(500).send({ message: 'Error executing statement' });
    }
    console.log(`Retrieved row:`, row);
    if (!row) {
      return res.status(404).send({ message: 'Room not found' });
    }
    res.json(row);
  });
});
 */












/* const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);


 */






