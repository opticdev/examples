import { FastifyInstance } from "fastify";
import { Static } from "@sinclair/typebox";

import * as Authors from "../../services/authors";
import { PaginatedTypeBox } from "../../services/paginated";

const GetAuthorsResponse = PaginatedTypeBox(Authors.AuthorResponse);
type GetAuthorsResponse = Static<typeof GetAuthorsResponse>;

export const registerGetAuthors = (app: FastifyInstance) => {
  app.get<{
    Reply: GetAuthorsResponse;
  }>(
    `/authors`,
    {
      schema: {
        response: { 200: GetAuthorsResponse },
      },
    },
    (request, reply) => {
      const authors = Authors.getMany();
      reply.code(200).send({
        has_more_data: false,
        data: authors,
        next: null,
      });
    }
  );
};
