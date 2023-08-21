import { FastifyInstance } from "fastify";
import * as Authors from "../../services/authors";
import * as Books from "../../services/books";
import * as Errors from "../../services/errors";

export const registerCreateBooks = (app: FastifyInstance) => {
  app.post<{
    Body: Books.BookRequest;
    Reply: Books.BookResponse | Errors.BadRequest;
  }>(
    `/books`,
    {
      schema: {
        body: Books.BookRequest,
        response: { 200: Books.BookResponse, 400: Errors.BadRequest },
      },
    },
    (request, reply) => {
      const hasAuthor = !!Authors.get(request.body.author_id);
      if (!hasAuthor) {
        reply.code(400).send({ message: "Bad Request" });
        return;
      }

      const book = Books.create(request.body);
      reply.code(200).send(book);
    }
  );
};
