import yaml from "yaml";
import fs from "node:fs/promises";
import { setupApp } from "./app";

(async () => {
  const app = await setupApp();
  const path = "openapi.yml";

  const yamlContents = yaml.stringify(app.swagger());
  await fs.writeFile(path, yamlContents);
})();
