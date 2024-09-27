import { body,param } from 'express-validator';

export const addSubTodoValidation = [
    // Validate 'tasj id'
    param('id')
        .exists({ checkFalsy: true })
        .withMessage('Task ID parameter is required')
        .isString()
        .withMessage('Task ID must be a string'),

    // Validate 'sub task id'
    body('id')
        .exists({ checkFalsy: true }).withMessage('ID is required')
        .isString().withMessage('ID must be a string'),

    // Validate 'taskName'
    body('taskName')
        .exists({ checkFalsy: true }).withMessage('Task name is required')
        .isString().withMessage('Task name must be a string')
        .notEmpty().withMessage('Task name cannot be empty'),

    // Validate 'taskStatus'
    body('taskStatus')
        .exists().withMessage('Task status is required')
        .isString().withMessage('Task status must be a string'),

    // Validate 'priority'
    body('priority')
        .exists().withMessage('Priority is required')
        .isString().withMessage('Priority must be a string'),

    // Validate 'subTasks'
    body('subTasks')
        .exists().withMessage('SubTasks are required')
        .isArray().withMessage('SubTasks must be an array'),

];
