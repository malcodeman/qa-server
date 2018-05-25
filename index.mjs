import express from "express";
import cors from "cors";

import questions_routes from "./questions/questions_routes.mjs";

const PORT = process.env.PORT || 9001;
const app = express();

app.use(cors());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use("/api/v1/questions", questions_routes);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
