const { read, create, update, remove } = require("../models/books");

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
    await create(req.body);
    return res.status(200).send("New book added");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Invalid Server Error");
  }
};
const updateBooks = async (req, res) => {
  try {
    await update(req.params.id, req.body);
    return res.status(200).send("Book updated successtully");
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
