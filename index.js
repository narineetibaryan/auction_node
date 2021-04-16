const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors')
const constants = require('./constants')
const io = require('socket.io')(server, {
    origin: "http://localhost:3000"
});

app.get('/', (req, res) => {
    res.send('<div>Hello</div>')
});

app.use(cors())
io.on('connection', (socket) => {
    console.log('User connected')
    socket.on(constants.BID_UPDATE, (data) => {
        io.emit(constants.BID_UPDATE, data);
    });
    socket.on(constants.ON_ADD_NEW_PRODUCT, (data) => {
        io.emit(constants.ON_ADD_NEW_PRODUCT, data)
    })
    socket.on(constants.ON_REMOVE_PRODUCT, (data) => {
        io.emit(constants.ON_REMOVE_PRODUCT, data)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
});

server.listen(8080, () => {
    console.log('Server has been started on port http://localhost:8080/');
});