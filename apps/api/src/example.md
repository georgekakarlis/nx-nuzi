So as I said I am using Express on the backend with Typescript. The frontend is on Nextjs also with Typescript. I am trying to create rooms in general, so that user can connect to them and later maybe add Websockets or something like that. So there is a form on the front end checking if the user wants to input a name for the room and then a button that if the user has not typed anything, that button generates a value in uuidv4() library and by using axios.post i send it to the backend. Now the backend is using SQLite3 to store the roomId or the roomName, as if user decides to type or no a name for the room, to the database with the POST request. the error is on the backend it the POST. and I see that on the console it says "here is the post error". I am posting the code so maybe u can take a look

// Open a SQLite database, stored in the file db.sqlite
const db = new sqlite3.Database('./db.sqlite');
db.run(`CREATE TABLE IF NOT EXISTS rooms (
  id BLOB PRIMARY KEY,
  name TEXT
)`);

app.post('/api/rooms', async (req, res) => {
  const roomName = req.query.roomName;
  const roomId = req.query.roomId;
  console.log(`${req.body}`);

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