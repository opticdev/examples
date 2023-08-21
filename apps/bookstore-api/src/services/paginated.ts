import { TAnySchema, Type } from "@sinclair/typebox";

export const PaginatedTypeBox = (T: TAnySchema) =>
  Type.Union([
    Type.Object({
      data: Type.Array(T),
      total_pages: Type.Optional(Type.Number()),
      next: Type.String(),
      has_more_data: Type.Literal(true),
    }),
    Type.Object({
      data: Type.Array(T),
      total_pages: Type.Optional(Type.Number()),
      next: Type.Null(),
      has_more_data: Type.Literal(false),
    }),
  ]);
