import Fastify from "fastify";
import openapi from "@fastify/swagger";
import { registerRoutes } from "./routes";

export const setupApp = async () => {
  const app = Fastify();

  await app.register(openapi, {
    openapi: {
      openapi: "3.1.3",
      info: {
        title: "Bookstore API",
        version: "1.0.0",
        description: "The API for books",
      },
      servers: [
        { url: "https://api.bookstore.com", description: "Production server" },
      ],
    },
  });

  registerRoutes(app);

  await app.ready();

  return app;
};
