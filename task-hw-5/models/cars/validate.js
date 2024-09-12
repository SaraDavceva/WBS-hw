const { Validator } = require("node-input-validator");

const CarCreate = {
  brand: "required|string",
  model: "required|string",
  year: "required|integer",
};

const CarUpdate = {
  brand: "string",
  model: "string",
  year: "integer",
};

const validateCar = async (data, schema) => {
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
  CarCreate,
  CarUpdate,
  validateCar,
};
