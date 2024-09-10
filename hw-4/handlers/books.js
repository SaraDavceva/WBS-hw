const validateSchema = require("../helper/validateSchema");

const { create, update, remove, getOne, getAll } = require("../models/book");
const { BookCreate, BookUpdate } = require("../models/book/validate");

const getBooks = async (req, res) => {
  try {
    const data = await getAll(req.auth.id);
    return res.status(200).send(data);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Invalid Server Error");
  }
};

const addBooks = async (req, res) => {
  try {
    const data = {
      ...req.body,
      user_id: req.auth.id,
    };
    await validateSchema(data, BookCreate);
    await create(data);
    return res.status(200).send("New book added");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Invalid Server Error");
  }
};
const updateBooks = async (req, res) => {
  try {
    const data = {
      ...req.body,
      user_id: req.auth.id,
    };
    await validateSchema(data, BookUpdate);
    const checkBook = await getOne(req.params.id);

    if (!checkBook) {
      return res.status(400).send("Book not found!");
    }

    if (checkBook.user_id.toString() !== req.auth.id.toString()) {
      return res.status(400).send("User is not owner of this book");
    }

    await update(req.params.id, data);

    return res.status(200).send("Book updated successtully");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Invalid Server Error");
  }
};
const removeBooks = async (req, res) => {
  try {
    const checkBook = await getOne(req.params.id);

    if (!checkBook) {
      return res.status(400).send("Post not found");
    }

    if (checkBook.user_id.toString() !== req.auth.id.toString()) {
      return res.status(400).send("User is not owner of this book");
    }
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
