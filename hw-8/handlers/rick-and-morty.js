const { charactersNames } = require("../pkg/rick-and-morty");

const getCharactersNames = async (req, res) => {
  try {
    const characters = await charactersNames(req.params.id);
    // console.log(ch)
    return res.status(200).send(characters);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = getCharactersNames;
