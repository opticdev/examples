import yaml from "yaml";
import fs from "node:fs/promises";
import { setupApp } from "./app";
const FILE_PATH = "./spec.yaml";

(async () => {
  const app = await setupApp();

  await app.ready();
  const yamlContents = yaml.stringify(app.swagger());
  await fs.writeFile(FILE_PATH, yamlContents);
})();
