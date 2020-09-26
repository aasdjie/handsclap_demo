const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

server.listen(8008, () => {
  console.log('正在监听端口：8008')
})

app.get('/', function(req, res) {
  // res.sendfile(__dirname + '/index.html')
  res.send('服务运行中')
})

io.on('connection', function(socket) {
  socket.emit('scanqr', { hello: 'world' })
  socket.on('my other event', function(data) {
    console.log(data)
  })
})
