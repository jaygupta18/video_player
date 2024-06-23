// Creating an array for validating the given body from the client

const { body } = require("express-validator");

const validationArray = [
  body("title").isString().withMessage("Title should be valid string"),
  body("author").isString().withMessage("Author should be a valid name"),
  body("description").isString().withMessage("Description should be valid"),
  body("isLive").isBoolean().withMessage("Parameter should be valid"),
  body("duration").isString().withMessage("Duration should be valid"),
  body("views").isString().withMessage("Views should be valid"),
  body("subscriber")
    .isInt({ min: 0 })
    .withMessage("Subscriber should be valid number"),
  body("email").isEmail().withMessage("Email should be a valid mail id"),
];

module.exports = validationArray;
