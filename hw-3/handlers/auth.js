const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginAttempt = require("../pkg/account/loginAttempt");
const { getByEmail, create } = require("../pkg/account");
const {
  validateAccount,
  AccoutLogin,
  AccoutRegister,
} = require("../pkg/account/validate");

const { getSection } = require("../pkg/config");

const markSuccess = async (account) => {
  try {
    account.successLogin += 1;
    await account.save();
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error");
  }
};

const markUnsuccess = async (account) => {
  try {
    account.unsuccessLogin += 1;
    await account.save();
  } catch (error) {
    console.error("Error");
  }
};

const login = async (req, res) => {
  try {
    await validateAccount(req.body, AccoutLogin);
    const { email, password } = req.body;

    const account = await getByEmail(email);

    if (!account) {
      return res.status(400).send("Account not found!");
    }

    if (!bcrypt.compareSync(password, account.password)) {
      await markUnsuccess(account);
      console.log("acc", account);
      return res.status(400).send("Wrong password");
    }

    const payload = {
      username: account.username,
      email: account.email,
      id: account._id,
      exp: new Date() / 1000 + 7 * 24 * 60 * 60,
    };

    const token = jwt.sign(payload, getSection("development").jwt_secret);

    await markSuccess(account);
    console.log("acc", account);

    return res.status(200).send({ message: "login successful", token });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

const register = async (req, res) => {
  try {
    await validateAccount(req.body, AccoutRegister);
    const { username, email, password, confirmPassword } = req.body;

    const exist = await getByEmail(email);
    if (exist) {
      return res.status(400).send("Account with this email already exists!");
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Paswords do not match!");
    }

    const data = {
      username,
      email,
      password: bcrypt.hashSync(password),
    };

    const account = await create(data);
    return res.status(200).send(account);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  login,
  register,
};
