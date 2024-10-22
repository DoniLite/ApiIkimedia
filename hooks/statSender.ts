import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { StateSenderPayload } from "../src";

export const statSenderHook = (
  req: FastifyRequest,
  res: FastifyReply,
  next: HookHandlerDoneFunction
) => {
  res.sender = async (payload: StateSenderPayload) => {
    return true;
  };
  next();
};
