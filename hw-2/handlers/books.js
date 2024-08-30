const { read, create, update, remove } = require("../models/books");

const { validateBook, BookCreate, BookUpdate } = require("../models/validate");

const getBooks = async (req, res) => {
  try {
    const books = await read();
    return res.status(200).send(books);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Invalid Server Error");
  }
};

const addBooks = async (req, res) => {
  try {
    const data = req.body;
    await validateBook(req.body, BookCreate);
    const newBook = await create(data);
    return res.status(200).send(newBook);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Invalid Server Error");
  }
};
const updateBooks = async (req, res) => {
  try {
    const bookId = req.params.id;
    await validateBook(req.body, BookUpdate);
    const updateBook = await update(bookId, req.body);
    return res.status(200).send(updateBook);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Invalid Server Error");
  }
};
const removeBooks = async (req, res) => {
  try {
    await remove(req.params.id);
    return res.status(200).send("Book deleted successtully");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Invalid Server Error");
  }
};

module.exports = {
  getBooks,
  addBooks,
  updateBooks,
  removeBooks,
};
