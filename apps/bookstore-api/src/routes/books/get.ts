import { FastifyInstance } from "fastify";
import { Type, Static } from "@sinclair/typebox";

import * as Authors from "../../services/authors";
import * as Books from "../../services/books";
import * as Errors from "../../services/errors";

const GetBookParams = Type.Object({
  bookId: Type.String(),
});
type GetBookParams = Static<typeof GetBookParams>;

const GetBookResponse = Type.Composite([
  Books.BookResponse,
  Type.Object({
    author: Type.Optional(Authors.AuthorResponse),
  }),
]);
type GetBookResponse = Static<typeof GetBookResponse>;

export const registerGetBook = (app: FastifyInstance) => {
  app.get<{
    Params: GetBookParams;
    Reply: GetBookResponse | Errors.NotFound;
  }>(
    `/books/:bookId`,
    {
      schema: {
        params: GetBookParams,
        response: { 200: GetBookResponse, 404: Errors.NotFound },
      },
    },
    (request, reply) => {
      const book = Books.get(request.params.bookId);
      if (!book) {
        reply.code(404).send({ message: "Not Found" });
      } else {
        const author = Authors.get(book.author_id) ?? undefined;
        reply.code(200).send({ ...book, author: author });
      }
    }
  );
};
