const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: String,
  author: String,
  year: Number,
});

const bookModel = mongoose.model("Books", bookSchema, "books");

const read = async () => {
  return await bookModel.find();
};

const create = async (data) => {
  const newBook = new bookModel(data);
  return await newBook.save();
};

const update = async (id, data) => {
  return await bookModel.updateOne({ _id: id }, data);
};

const remove = async (id) => {
  return await bookModel.deleteOne({ _id: id });
};

module.exports = {
  read,
  create,
  update,
  remove,
};
