import { FastifyInstance } from "fastify";
import { Type, Static } from "@sinclair/typebox";

import * as Books from "../../services/books";
import * as Errors from "../../services/errors";

const PatchBookParams = Type.Object({
  bookId: Type.String(),
});
type PatchBookParams = Static<typeof PatchBookParams>;

const PatchBookBody = Type.Partial(Books.BookRequest);
type PatchBookBody = Static<typeof PatchBookBody>;

export const registerPatchBook = (app: FastifyInstance) => {
  app.patch<{
    Params: PatchBookParams;
    Body: PatchBookBody;
    Reply: Books.BookResponse | Errors.NotFound;
  }>(
    `/books/:bookId`,
    {
      schema: {
        params: PatchBookParams,
        body: PatchBookBody,
        response: { 200: Books.BookResponse, 404: Errors.NotFound },
      },
    },
    (request, reply) => {
      const book = Books.update(request.params.bookId, request.body);
      if (!book) {
        reply.code(404).send({ message: "Not Found" });
      } else {
        reply.code(200).send(book);
      }
    }
  );
};
