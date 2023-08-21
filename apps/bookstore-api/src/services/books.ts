import { Static, Type } from "@sinclair/typebox";
import { nanoid } from "nanoid";

export const BookRequest = Type.Object({
  name: Type.String(),
  price: Type.Number(),
  author_id: Type.String(),
});
export type BookRequest = Static<typeof BookRequest>;

export const BookResponse = Type.Object({
  id: Type.String(),
  name: Type.String(),
  price: Type.Number(),
  author_id: Type.String(),
  created_at: Type.String(),
  updated_at: Type.String(),
});
export type BookResponse = Static<typeof BookResponse>;

const books: BookResponse[] = [
  {
    id: "WjE9O1d8ELCb8POiOw4pn",
    name: "Pride and Prejudice",
    author_id: "6nTxAFM5ck4Hob77hGQoL",
    price: 10,
    created_at: "2023-01-22T17:17:41.326Z",
    updated_at: "2023-01-22T17:17:41.326Z",
  },
  {
    id: "vZsYVmzdxtihxQNqCs-3f",
    name: "The Great Gatsby",
    author_id: "NjpTwgmENj11rGdUgpCQ9",
    price: 15,
    created_at: "2022-10-22T10:11:51.421Z",
    updated_at: "2022-10-22T10:11:51.421Z",
  },
  {
    id: "lqqXCWnueFQbihgZtK9a-",
    name: "To Kill a Mockingbird",
    author_id: "AcSwiQryWBeQqcNBqBg43",
    price: 8,
    created_at: "2022-05-01T07:11:01.701Z",
    updated_at: "2022-05-12T07:18:19.127Z",
  },
  {
    id: "t_6i-nROr669AOPNE3RTq",
    name: "Nineteen Eighty-Four",
    author_id: "tNpOpQZbxytxTxDT15GQy",
    price: 14,
    created_at: "2023-02-01T21:19:08.600Z",
    updated_at: "2023-02-01T21:19:08.600Z",
  },
];

const bookDatabase = new Map(books.map((b) => [b.id, b]));

export function update(
  id: string,
  updates: Partial<BookRequest>
): BookResponse | null {
  let book = bookDatabase.get(id);
  if (book) {
    book = {
      ...book,
      ...updates,
      updated_at: new Date().toISOString(),
    };
    bookDatabase.set(id, book);
  }
  return book ?? null;
}

export function getMany(sort: {
  key: "name" | "created_at" | "updated_at";
  order: "asc" | "desc";
}): BookResponse[] {
  return [...bookDatabase.values()].sort((a, b) => {
    const comparison =
      sort.key === "name"
        ? a.name.localeCompare(b.name)
        : new Date(a[sort.key]).getTime() - new Date(b[sort.key]).getTime();
    const order = sort.order === "asc" ? 1 : -1;
    return comparison * order;
  });
}

export function get(id: string): BookResponse | null {
  return bookDatabase.get(id) ?? null;
}

export function create(bookRequest: BookRequest): BookResponse {
  const id = nanoid();
  const now = new Date().toISOString();
  const book = {
    ...bookRequest,
    id,
    created_at: now,
    updated_at: now,
  };
  bookDatabase.set(id, book);
  return book;
}
