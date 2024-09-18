const express = require("express");

const { getSection } = require("./pkg/config");
const getCharactersNames = require("./handlers/rick-and-morty");

const app = express();

app.get("/characters/:id", getCharactersNames);
app.listen(getSection("rick-and-morty").port, () =>
  console.log(`Server started at port ${getSection("rick-and-morty").port}`)
);
