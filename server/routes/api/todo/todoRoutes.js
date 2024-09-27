import { appController } from "../../../controllers/index.js";
import { addTodoValidation } from '../../../validations/addTodoValidation.js';
import { addSubTodoValidation } from '../../../validations/addSubTodoValidation.js';
import { updateTodoValidation } from '../../../validations/updateTodoValidation.js';
import { deleteTodoValidation } from '../../../validations/deleteTodoValidation.js';
import validate from '../../../middlewares/validate.js';
import { Router } from "express";
const router = Router();

const {  todoController } = appController();

router.get('/',  todoController.getTodo);
router.post('/', addTodoValidation, validate,  todoController.addTodo);
router.post('/:id',addSubTodoValidation,validate, todoController.addSubTodo);
router.patch('/:id',updateTodoValidation,validate,todoController.updateTodo);
router.delete('/:id',deleteTodoValidation,validate, todoController.deleteTodo);

export default router;