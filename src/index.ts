import { getConnectionMongo } from './db/mongoDbConnection'
import { Server as WebSocketServer } from 'socket.io'
import http from 'http'
import app from './app'
import sockets from './socket/sockets'
const server = http.createServer(app)
const httpServer = server.listen(3000)
console.log('Server on http://localhost:', 3000)
getConnectionMongo()

const io = new WebSocketServer(httpServer)

sockets(io)
