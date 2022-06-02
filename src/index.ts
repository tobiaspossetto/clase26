import { getConnectionMongo } from './db/mongoDbConnection'
import { Server as WebSocketServer } from 'socket.io'
import http from 'http'
import app, { PORT } from './app'
import sockets from './socket/sockets'
const server = http.createServer(app)

const httpServer = server.listen(process.env.PORT || PORT || 3000)
// @ts-ignore
console.log('Server on http://localhost:', httpServer.address().port)
getConnectionMongo()

const io = new WebSocketServer(httpServer)

sockets(io)
