import express from 'express';
import { Server } from 'http';
import Socket from 'socket.io';

const app = express();
const server = Server(app);
const io = new Socket(server);

app.get('/', (req, res) =>
  res.sendFile(__dirname + '/index.html')
);

let messages = [];

const chatIO = io
  .of('/chat');

chatIO
  .on('connection', function(socket){
  console.log('a client connected!');
  socket.broadcast.emit('chat message', 'a user connected!');

  messages.forEach(msg => socket.emit('chat message', msg));

  socket.on('chat message', function(data){
    console.log('chat message data', data);
    const msg = data.msg;
    socket.broadcast.emit('chat message', msg);
    messages.push(msg);
    console.log('message: ' + msg);
  });

  socket.on('disconnect', function () {
    console.log('a client disconnected!');
    chatIO.emit('chat message', 'a user disconnected!')
  });
});


server.listen(3030, () => console.log('Example app listening on port 3030!'));

export default app;