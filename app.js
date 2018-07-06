const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const ioRedis = require('socket.io-redis');
const sub = require('./server/redis').sub;
const routes = require('./routes');

const PORT = process.env.PORT || 3333;
const channelSet = {};

const app = express();
const server = http.Server(app);
const io = socketIo(server);

app.set('port', PORT);
app.use('/static', express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);

sub.on('message', (channel, message) => {
    io.to(channel).emit('message', JSON.parse(message));
})

io.on('connection', (socket) => {
    const channelId = socket.handshake.query.channelId;
    socket.join(channelId);

    if(!channelSet[channelId]) {
        channelSet[channelId] = {};
        sub.subscribe(channelId);
    }
})

io.adapter(ioRedis({host: '127.0.0.1', port: 6379}));

server.listen(PORT, '0.0.0.0', () => {
    console.log('Pudding server listening on port ' + PORT);
})
