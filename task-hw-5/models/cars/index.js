const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Account",
  },
  brand: String,
  model: String,
  year: Number,
});

const CarModel = mongoose.model("Cars", carSchema, "cars");

const getAll = async (id) => {
  return await CarModel.find({ user_id: id });
};

const getOne = async (id) => {
  return await CarModel.findOne({ _id: id });
};

const create = async (data) => {
  const newBook = new CarModel(data);
  return await newBook.save();
};

const update = async (id, data) => {
  return await CarModel.updateOne({ _id: id }, data);
};

const remove = async (id) => {
  return await CarModel.deleteOne({ _id: id });
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
