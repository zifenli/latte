const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const redis  = require('redis');
const ioRedis = require('socket.io-redis');

const PORT = process.env.PORT || 3333;
const channelSet = {};

const app = express();
const server = http.Server(app);
const io = socketIo(server);
const pub = redis.createClient();
const sub = redis.createClient();

app.set('port', PORT);
app.use('/static', express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
})

app.post('/test/', (req, res) => {
    const channel = req.body.channel;

    res.json({
        status: 200,
        channel: channel,
        data: JSON.stringify(req.body)
    });

    pub.publish(channel, JSON.stringify(req.body));
})

sub.on('subscribe', (channel, count) => {
    console.log(channel + ' subscribe in');
})

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
