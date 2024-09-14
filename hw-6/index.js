const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const fileUpload = require("express-fileupload");

const connectDB = require("./pkg/db/config");
connectDB();

const { getSection } = require("./pkg/config");
const {
  login,
  register,
  refreshToken,
  resetPassword,
} = require("./handlers/auth");
const {
  upload,
  download,
  removeFile,
  listFilesForUser,
} = require("./handlers/storage");

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
app.use(fileUpload());

app.post("/auth/login", login);
app.post("/auth/register", register);
app.post("/auth/refresh", refreshToken);
app.post("/auth/reset", resetPassword);

app.post("/api/storage", upload);
app.get("/api/storage/:filename", download);

app.delete("/api/storage/:filename", removeFile);
app.get("/api/list", listFilesForUser);

app.listen(getSection("development").port, () =>
  console.log(`Server starter at port ${getSection("development").port}`)
);
