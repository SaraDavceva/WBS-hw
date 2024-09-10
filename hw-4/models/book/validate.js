const { Validator } = require("node-input-validator");

const BookCreate = {
  title: "required|string",
  author: "required|string",
  year: "required|integer",
};

const BookUpdate = {
  title: "string",
  author: "string",
  year: "integer",
};

const validateBook = async (data, schema) => {
  const validator = new Validator(data, schema);
  const err = await validator.check();

  if (!err) {
    throw {
      code: 400,
      error: "Error",
    };
  }
};

module.exports = {
  BookCreate,
  BookUpdate,
  validateBook,
};
