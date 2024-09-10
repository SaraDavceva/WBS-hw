const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Account",
  },
  title: String,
  author: String,
  year: Number,
});

const bookModel = mongoose.model("Books", bookSchema, "books");

const getAll = async (id) => {
  return await bookModel.find({ user_id: id });
};

const getOne = async (id) => {
  return await bookModel.findOne({ _id: id });
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
  getAll,
  getOne,
  create,
  update,
  remove,
};
