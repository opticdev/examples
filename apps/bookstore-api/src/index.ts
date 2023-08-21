import { setupApp } from "./app";

const port = process.env.PORT || 3030;

(async () => {
  const app = await setupApp();
  app.listen(
    {
      port: Number(port),
      host: "0.0.0.0",
    },
    () => {
      console.log({
        server: `bookstore-api is listening on port: ${port}`,
      });
    }
  );
})();
