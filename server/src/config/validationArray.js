const { body } = require("express-validator");
const validationArray = [
  body("title").isString().withMessage("Title should be valid string"),
  body("author").isString().withMessage("Author should be a valid name"),
  body("description").isString().withMessage("Description should be valid"),
  body("email").isEmail().withMessage("Email should be a valid mail id"),
];

module.exports = validationArray;
