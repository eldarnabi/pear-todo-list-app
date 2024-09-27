import { param } from "express-validator";

export const deleteTodoValidation = [
  param("id")
    .exists({ checkFalsy: true })
    .withMessage("Task ID parameter is required")
    .isString()
    .withMessage("Task ID must be a string"),
];