import { FastifyInstance } from "fastify";
import { Type, Static } from "@sinclair/typebox";

import * as Authors from "../../services/authors";
import * as Errors from "../../services/errors";

const GetAuthorParams = Type.Object({
  authorId: Type.String(),
});
type GetAuthorParams = Static<typeof GetAuthorParams>;

export const registerGetAuthor = (app: FastifyInstance) => {
  app.get<{
    Params: GetAuthorParams;
    Reply: Authors.AuthorResponse | Errors.NotFound;
  }>(
    `/authors/:authorId`,
    {
      schema: {
        params: GetAuthorParams,
        response: { 200: Authors.AuthorResponse, 404: Errors.NotFound },
      },
    },
    (request, reply) => {
      const author = Authors.get(request.params.authorId);
      if (!author) {
        reply.code(404).send({ message: "Not Found" });
      } else {
        reply.code(200).send(author);
      }
    }
  );
};
