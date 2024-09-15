const express = require("express");
require("dotenv").config();

const { expressjwt: jwt } = require("express-jwt");

const connectDB = require("./pkg/db/config");
connectDB();

const { getSection } = require("./pkg/config");
const {
  login,
  register,
  refreshToken,
  resetPassword,
} = require("./controllers/auth");

const { upload, download } = require("./controllers/storage");
const {
  getCars,
  addCars,
  updateCars,
  removeCars,
} = require("./controllers/cars");

const app = express();

app.use(express.json());
app.use(
  jwt({
    secret: getSection("development").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: ["/auth/login", "/auth/register", "/auth/reset"],
  })
);

app.post("/auth/login", login);
app.post("/auth/register", register);
app.post("/auth/refresh", refreshToken);
app.post("/auth/reset", resetPassword);

app.post("/api/storage", upload);
app.get("/api/storage/:filename", download);

app.get("/cars", getCars);
app.post("/cars", addCars);
app.put("/cars/:id", updateCars);
app.delete("/cars/:id", removeCars);

app.listen(getSection("development").port, () =>
  console.log(`Server started at port ${getSection("development").port}!`)
);
