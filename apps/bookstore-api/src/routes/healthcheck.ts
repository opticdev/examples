import { FastifyInstance } from "fastify";
import { Static, Type } from "@sinclair/typebox";

const HealthcheckResponse = Type.Object({
  status: Type.String(),
});
type HealthcheckResponse = Static<typeof HealthcheckResponse>;

export const registerHealthCheck = (app: FastifyInstance) => {
  app.get<{ Reply: HealthcheckResponse }>(
    "/healthcheck",
    {
      schema: {
        response: {
          200: HealthcheckResponse,
        },
      },
    },
    (request, reply) => {
      reply.code(200).send({ status: "ok" });
    }
  );
};
