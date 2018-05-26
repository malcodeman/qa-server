import express from "express";
import cors from "cors";

import auth_routes from "./auth/auth_routes.mjs";
import users_routes from "./users/users_routes.mjs";
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
app.use("/api/v1/auth", auth_routes);
app.use("/api/v1/users", users_routes);
app.use("/api/v1/questions", questions_routes);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
