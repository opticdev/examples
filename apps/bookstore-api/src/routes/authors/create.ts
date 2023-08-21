import { FastifyInstance } from "fastify";
import * as Authors from "../../services/authors";

export const registerCreateAuthors = (app: FastifyInstance) => {
  app.post<{
    Body: Authors.AuthorRequest;
    Reply: Authors.AuthorResponse;
  }>(
    `/authors`,
    {
      schema: {
        body: Authors.AuthorRequest,
        response: { 200: Authors.AuthorResponse },
      },
    },
    (request, reply) => {
      const book = Authors.create(request.body);
      reply.code(200).send(book);
    }
  );
};
