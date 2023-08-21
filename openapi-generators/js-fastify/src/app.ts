import Fastify, { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import { Static, Type } from "@sinclair/typebox";

export const setupApp = async () => {
  const app = Fastify();

  await app.register(fastifySwagger, {
    // Opt into OpenAPIV3 generation
    openapi: {
      openapi: '3.1.3',
      info: {
        title: "My api spec",
        version: "1.0.0",
      }
    },
  });

  setupRoutes(app);

  return app;
};

const setupRoutes = (app: FastifyInstance) => {
  // You can also write json schema here instead as well
  const UserRequest = Type.Object({ id: Type.String() });
  type UserRequest = Static<typeof UserRequest>
  const UserResponse = Type.Object({
    users: Type.Array(Type.Object({ id: Type.String() })),
  });
  type UserResponse = Static<typeof UserResponse>

  app.get<{ Reply: UserResponse }>(
    "/api/users",
    {
      schema: {
        response: {
          200: UserResponse,
        },
      },
    },
    (request, reply) => {
      reply.send({
        users: [
          {
            id: "user-1",
          },
        ],
      });
    }
  );

  app.post<{
    Body: UserRequest,
    Reply: UserResponse
  }>(
    "/api/users",
    {
      schema: {
        body: UserRequest,
        response: {
          200: UserResponse,
        },
      },
    },
    (request, reply) => {
      reply.send({
        users: [
          {
            id: request.body.id,
          },
        ],
      });
    }
  );
};
