'use strict'
import fastify from 'fastify'
import { get } from '../routes'
import cors from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import path from 'node:path'
import fastifyFormbody from '@fastify/formbody'
import fastifySession from '@fastify/session'
import fastifyCookie from '@fastify/cookie'
import fastifyWebsocket from '@fastify/websocket'
import multer from 'fastify-multer'
import { statSenderHook } from '../hooks/statSender'
import { sessionHandlerHook } from '../hooks/sess'

const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads')
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "_" +
        String(Date.now()) +
        path.extname(file.originalname)
    );
  }
})

const upload = multer({ storage: storage })

const server = fastify({
    logger: true
})

// Hooks...
server.addHook("preHandler", sessionHandlerHook);
server.addHook("onResponse", statSenderHook)


//Puglins...
server.register(cors, { 
  origin: 'http://localhost:8081'
})
server.register(multer.contentParser)
server.register(fastifyCookie);
server.register(fastifySession, {secret: 'a secret with minimum length of 32 characters'});
server.register(fastifyWebsocket)
server.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/static/', // optional: default '/'
  constraints: { host: 'example.com' } // optional: default {}
})

//routes...
server.get('/api', get)
server.get('/user/sockect',{websocket: true}, (socket, req) => {
    
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})