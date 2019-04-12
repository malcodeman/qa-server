import express from "express";
import cors from "cors";

import auth_routes from "./auth/auth_routes.js";
import users_routes from "./users/users_routes.js";
import questions_routes from "./questions/questions_routes.js";
import answers_routes from "./answers/answers_routes.js";

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use("/api/auth", auth_routes);
app.use("/api/users", users_routes);
app.use("/api/questions", questions_routes);
app.use("/api/answers", answers_routes);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
