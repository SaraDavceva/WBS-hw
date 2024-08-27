const express = require("express");

const connect = require("./db/config");
connect();
const {
  getBooks,
  addBooks,
  updateBooks,
  removeBooks,
} = require("./handlers/books");

const app = express();
app.use(express.json());

app.get("/books", getBooks);
app.post("/books", addBooks);
app.put("/books/:id", updateBooks);
app.delete("/books/:id", removeBooks);
app.listen(3000, () => console.log("Server started at port 3000!"));
