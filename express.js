var express = require('express');
var session = require('express-session');
var app = express();
var cors = require('cors');
var fs = require('fs');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.locals.pretty = true;
app.use(cors());
app.use(express.static('view'));

app.use('/', require('./controller/ctrFile'));


app.use(session({
  secret: '@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized: true
}));


app.get('/', function (req, res) {
  res.writeHead(200);
  res.end(fs.readFileSync(__dirname + "/view/main.html"));
});



io.on('connection', (socket) => {
  console.log('a user connected', socket);
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


//local
http.listen(9000, async function () {
  console.log('server started');
});