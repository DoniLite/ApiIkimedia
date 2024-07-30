import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

export const sessionHandlerHook = (
  req: FastifyRequest,
  res: FastifyReply,
  next: HookHandlerDoneFunction
) => {
  const { user } = req.query as { user: string };
  req.session.user = { name: user };
  next();
};
