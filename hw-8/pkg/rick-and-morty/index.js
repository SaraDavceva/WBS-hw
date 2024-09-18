const config = require("../config");

const CACHE = {};

const charactersNames = async (id) => {
  let now = new Date().getTime() / 1000;

  if (
    CACHE[id] &&
    now < CACHE[id].timestamp + config.getSection("rick-and-morty").exp
  ) {
    return CACHE[id];
  }

  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const data = await res.json();

    CACHE[id] = {
      timestamp: new Date().getTime() / 1000,
      name: data.name,
    };
    return data;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  charactersNames,
};
