import { body } from 'express-validator';

export const addTodoValidation = [

    body('taskName')
        .exists({ checkFalsy: true }).withMessage('Task name is required')
        .isString().withMessage('Task name must be a string')
        .notEmpty().withMessage('Task name cannot be empty'),

];
