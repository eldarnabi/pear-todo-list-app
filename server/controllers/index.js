import { todoController} from './todoController/todoController.js';


export const appController = () => ({
    todoController: todoController(),
}); 