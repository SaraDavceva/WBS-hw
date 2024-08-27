const { read, write } = require("../read-write");

const getBooks = async (req, res) => {
  try {
    const books = await read("books.json");
    return res.status(200).send(books);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Invalid Server Error");
  }
};

const addBooks = async (req, res) => {
  try {
    const books = await read("books.json");
    const newbooks = req.body;
    books.push(newbooks);
    await write("books.json", books);
    return res.status(200).send("New book added");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Invalid Server Error");
  }
};

const updateBooks = async (req, res) => {
  try {
    let books = await read("books.json");
    const newData = req.body;
    const bookId = Number(req.params.id);

    books = books.map((book, index) => {
      if (index === bookId) {
        return {
          ...book,
          ...newData,
        };
      }
      return book;
    });

    await write("books.json", books);
    return res.status(200).send("Book updated successfully!");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Invalid Server Error");
  }
};

const removeBooks = async (req, res) => {
  try {
    let books = await read("books.json");
    const bookId = Number(req.params.id);

    books = books.filter((index) => index !== bookId);

    await write("books.json", books);
    return res.status(200).send("Book deleted successfully!");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Invalid Server Error");
  }
};

module.exports = {
  getBooks,
  addBooks,
  updateBooks,
  removeBooks,
};
