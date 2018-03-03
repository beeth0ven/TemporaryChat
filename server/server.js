import express from 'express';
import { Server } from 'http';
import Socket from 'socket.io';

const app = express();
const server = Server(app);
const io = new Socket(server);

app.get('/', (req, res) =>
  res.sendFile(__dirname + '/index.html')
);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

server.listen(3030, () => console.log('Example app listening on port 3030!'));

export default app;