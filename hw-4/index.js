const express = require("express");
const { expressjwt: jwt } = require("express-jwt");

const connectDB = require("./db/config");
connectDB();

const { getSection } = require("./config/index");
const { login, register } = require("./handlers/auth");

const {
  getBooks,
  addBooks,
  updateBooks,
  removeBooks,
} = require("./handlers/books");

const app = express();

app.use(express.json());
app.use(
  jwt({
    secret: getSection("development").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: ["/auth/login", "/auth/register"],
  })
);

app.post("/auth/login", login);
app.post("/auth/register", register);

app.get("/books", getBooks);
app.post("/books", addBooks);
app.put("/books/:id", updateBooks);
app.delete("/books/:id", removeBooks);
app.listen(getSection("development").port, () =>
  console.log(`Server started at port ${getSection("development").port}!`)
);
