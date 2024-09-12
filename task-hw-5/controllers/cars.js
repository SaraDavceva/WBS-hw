const {
  create,
  update,
  remove,
  getOne,
  getAll,
} = require("../models/cars/index");
const { CarCreate, validateCar } = require("../models/cars/validate");

const getCars = async (req, res) => {
  try {
    const data = await getAll(req.auth.id);
    return res.status(200).send(data);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Invalid Server Error");
  }
};

const addCars = async (req, res) => {
  try {
    const data = {
      ...req.body,
      user_id: req.auth.id,
    };
    // const data = req.body;
    await validateCar(data, CarCreate);
    await create(data);
    return res.status(200).send("New car added");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Invalid Server Error");
  }
};
const updateCars = async (req, res) => {
  try {
    const data = {
      ...req.body,
      user_id: req.auth.id,
    };
    await validateCar(data, CarUpdate);
    const checkCar = await getOne(req.params.id);

    if (!checkCar) {
      return res.status(400).send("Car not found!");
    }

    if (checkBook.user_id.toString() !== req.auth.id.toString()) {
      return res.status(400).send("User is not owner of this car");
    }

    await update(req.params.id, data);

    return res.status(200).send("Car updated successtully");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Invalid Server Error");
  }
};
const removeCars = async (req, res) => {
  try {
    const checkCar = await getOne(req.params.id);

    if (!checkCar) {
      return res.status(400).send("Car not found");
    }

    if (checkCar.user_id.toString() !== req.auth.id.toString()) {
      return res.status(400).send("User is not owner of this car");
    }
    await remove(req.params.id);
    return res.status(200).send("car deleted successtully");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Invalid Server Error");
  }
};

module.exports = {
  removeCars,
  getCars,
  addCars,
  updateCars,
};
