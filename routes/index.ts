import { FastifySessionObject } from "@fastify/session";
import { FastifyReply, FastifyRequest } from "fastify";


export const post = (req: FastifyRequest, res: FastifyReply) => {

}

export const get = (req: FastifyRequest, res: FastifyReply) => {
    const session = req.session
    const userSession = session.user
    res.header('Content-Type', 'application/json')
    res.header('access-control-allow-credentials', true)
    res.send(JSON.stringify({...userSession}))
}