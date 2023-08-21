import { FastifyInstance } from "fastify";
import { Type, Static } from "@sinclair/typebox";

import * as Authors from "../../services/authors";
import * as Errors from "../../services/errors";

const PatchAuthorParams = Type.Object({
  authorId: Type.String(),
});
type PatchAuthorParams = Static<typeof PatchAuthorParams>;

const PatchAuthorBody = Type.Partial(Authors.AuthorRequest);
type PatchAuthorBody = Static<typeof PatchAuthorBody>;

export const registerPatchAuthor = (app: FastifyInstance) => {
  app.patch<{
    Params: PatchAuthorParams;
    Body: PatchAuthorBody;
    Reply: Authors.AuthorResponse | Errors.NotFound;
  }>(
    `/authors/:authorId`,
    {
      schema: {
        params: PatchAuthorParams,
        body: PatchAuthorBody,
        response: { 200: Authors.AuthorResponse, 404: Errors.NotFound },
      },
    },
    (request, reply) => {
      const author = Authors.update(request.params.authorId, request.body);
      if (!author) {
        reply.code(404).send({ message: "Not Found" });
      } else {
        reply.code(200).send(author);
      }
    }
  );
};
