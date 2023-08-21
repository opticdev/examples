import { Static, Type } from "@sinclair/typebox";

export const BadRequest = Type.Object({ message: Type.String() });
export type BadRequest = Static<typeof NotFound>;

export const NotFound = Type.Object({ message: Type.String() });
export type NotFound = Static<typeof NotFound>;
