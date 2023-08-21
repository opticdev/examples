import { setupApp } from "./app";

(async () => {
  const app = await setupApp();

  app.listen({ port: 3000 }, (err, address) => {
    if (err) throw err;
    console.log(`app is listening on ${address}`)
  });
})();
