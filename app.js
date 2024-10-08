import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./server/routes/index.js";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPath = path.join(__dirname, "/client/dist/");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.static(staticPath));
app.use(express.json());
app.use(routes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(staticPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});