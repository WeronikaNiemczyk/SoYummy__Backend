const fs = require("fs/promises");
const path = require("path");


const pathContacts = path.join(__dirname, "../../data/categories.json");

const getCategoriesList = async (req, res) => {
  const data = await fs.readFile(pathContacts);
  const result = JSON.parse(data);
  res.json({
    category: result.sort(),
  });
};

module.exports =  getCategoriesList;