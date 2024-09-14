const fs = require("fs");
const makeId = require("../pkg/strings");

const MAX_FILESIZE = 10479616;
const ALLOWED_FILETYPES = ["image/jpeg", "image/jpg", "image/png"];

const upload = async (req, res) => {
  if (MAX_FILESIZE < req.files.document.size) {
    return res.status(400).send("File exceeds max file size!");
  }

  if (!ALLOWED_FILETYPES.includes(req.files.document.mimetype)) {
    return res.status(400).send("File type not allowed!");
  }

  const userDir = `user_${req.auth.id}`;
  const userDirPath = `${__dirname}/../uploads/${userDir}`;

  if (!fs.existsSync(userDirPath)) {
    fs.mkdirSync(userDirPath);
  }

  const newFileName = req.files.document.name.split(".");

  const fileName = `${newFileName[0]}_${makeId(6)}.${newFileName[1]}`;
  const filePath = `${userDirPath}/${fileName}`;

  req.files.document.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send("Internal Server Error!");
    }
    return res.status(201).send({ file_name: fileName });
  });
};

const download = async (req, res) => {
  const userDir = `user_${req.auth.id}`;
  const userDirPath = `${__dirname}/../uploads/${userDir}`;
  const filePath = `${userDirPath}/${req.params.filename}`;
  console.log("file path", filePath);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found!");
  }

  res.download(filePath);
};

const listFilesForUser = async (req, res) => {
  const userDir = `user_${req.auth.id}`;
  const userDirPath = `${__dirname}/../uploads/${userDir}`;

  if (!fs.existsSync(userDirPath)) {
    return res.status(404).send("Folder not found!");
  }

  fs.readdir(userDirPath, (err, files) => {
    if (err) {
      return res.status(500).send("Error!");
    }

    res.send({ files });
  });
};

const removeFile = async (req, res) => {
  const userDir = `user_${req.auth.id}`;
  const userDirPath = `${__dirname}/../uploads/${userDir}`;
  const filePath = `${userDirPath}/${req.params.filename}`;

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found!");
  }

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).send("Error");
    }

    fs.readdir(userDirPath, (err, files) => {
      if (err) {
        return res.status(500).send("Error");
      }

      if (files.length === 0) {
        fs.rmdir(userDirPath, (err) => {
          if (err) {
            return res.status(500).send("Error");
          }
          res.send("File and directory deleted successfully ");
        });
      } else {
        res.send("File deleted successfully!");
      }
    });
  });
};

module.exports = {
  upload,
  download,
  removeFile,
  listFilesForUser,
};
