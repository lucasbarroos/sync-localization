const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = 3000

app.get('/map', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.get('/vehicle', function (req, res) {
    res.sendFile(__dirname + '/vehicle.html')
})

io.on('connection', function (socket) {
    console.clear()
    console.log('A user connected')
    socket.on('disconnect', function (result) {
        console.log('A user disconnect')
    })

    socket.on('event', function (result) {
        console.log('Sync Localization')
        io.emit('event', result)
    })
})

http.listen(port, function () {
    console.log("Application running in port: ", port)
})