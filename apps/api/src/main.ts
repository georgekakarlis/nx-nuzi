
import * as express from 'express'
import * as cors from 'cors';
import * as sqlite3 from 'sqlite3';
import axios from 'axios'



const app = express();



app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' , }));

// Open a SQLite database, stored in the file db.sqlite
const db = new sqlite3.Database('./db.sqlite');
db.run(`CREATE TABLE IF NOT EXISTS rooms (
  id BLOB PRIMARY KEY,
  name TEXT
)`);


// custom error handling
class CustomError extends Error {
  public status: number;
  public data: any;

  constructor(message: string, status: number, data: any) {
    super(message);
    this.name = 'CustomError';
    this.status = status;
    this.data = data;
  }
}




const rooms: { [id: string]: { name: string } } = {};


//Here, we first retrieve the roomName and roomId parameters from the query string. 
//Then, we check which parameter was provided in the request. 
//If roomName is present, we use an INSERT statement to insert a new row into the rooms table with the provided roomName. 
//If roomId is present, we use an INSERT statement to insert a new row into the rooms table with the provided roomId.
//Finally, we send a response with a 201 status code and the roomId and roomName values, regardless of which parameter was provided in the request.
app.post('/api/rooms', async (req, res) => {
  const roomName = req.query.roomName;
  const roomId = req.query.roomId;

  try {
    let statement;
    if (roomName) {
      // Insert room with name
      statement = db.prepare(`INSERT INTO rooms (name) VALUES (?)`);
      statement.run(roomName);
    } else if (roomId) {
      // Insert room with id
      statement = db.prepare(`INSERT INTO rooms (id) VALUES (?)`);
      statement.run(roomId);
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



app.get('/rooms/:id', async (req, res) => {
  const {roomName, roomId} = req.query; //changed to query to match the expectaions of query

  try {
    db.get(`SELECT * FROM rooms WHERE id = ?`, [roomId], (error, row) => {
      if (error) {
        throw error;
      }
      if (!row) {
        throw new Error('Room not found');
      }
      res.json(row);
    });
  }  catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status).send({ message: error.message, data: error.data });
    } else {
      res.status(500).send({ message: 'here is the get error!' });
    }
  }
});









const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);









