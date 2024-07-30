import "fastify";
import "@fastify/session";
import { StateSenderPayload } from ".";

declare module "fastify" {
  interface Session {
    user?: any; // Remplace `any` par le type approprié
    // Ajoute d'autres propriétés de session ici si nécessaire
  }

  interface FastifyReply {
    sender: (payload: StateSenderPayload) => Promise<boolean>;
  }
}
