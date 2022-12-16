
import * as express from 'express'
import * as cors from 'cors';
import { Database } from 'sqlite3';


const app = express();



app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' , }));

// Open a SQLite database, stored in the file db.sqlite
const db = new Database('db.sqlite');
db.run(`CREATE TABLE IF NOT EXISTS rooms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
)`);


const rooms: { [id: string]: { name: string } } = {};


app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.post('/api/rooms', async (req, res) => {
  const { roomName, roomId } = req.body;

  try {
    const statement = db.prepare(`INSERT INTO rooms (id, name) VALUES (?, ?)`);
    statement.run(roomId, roomName);
    statement.finalize();
    res.status(201).json({ roomId, roomName });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/rooms/${id}', async (req, res) => {
  const {roomName, roomId} = req.body;

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
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});










const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);









