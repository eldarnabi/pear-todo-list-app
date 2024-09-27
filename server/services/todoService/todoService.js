import  json  from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from "url";
import { Todo } from '../../entities/Todo.js';
import { console } from 'inspector';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "../../db");
const dbFilePath = `${dbPath}/db.json`

export const todoService = () => {
    
    const readDbFile = () => {
       try{
            let tasks = fs.readFileSync(dbFilePath, 'utf8');
             if(tasks ===""){
                tasks = "[]"
             }
             return JSON.parse(tasks);
       } catch (error){
        console.error(error.message);
        throw error;
       }
    };

    const saveDbFile = (data) => {
        try {
            fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 4));
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    };
    
    const insertOne = (data) => {
        try {   

            const tasks = readDbFile();
            const newTask = Todo(data)
            // check if task already exist
            const isExist = tasks.find(task => task.taskName === newTask.taskName);
            
            if(isExist){
                throw new Error('Task already exist');
            }
            tasks.unshift(newTask);
            saveDbFile(tasks);
            return newTask;

        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    const deleteOne = (id) => {
        try {
            const tasks = readDbFile();
            const filteredTasks = tasks.filter(task => task.id !== id);
            if (tasks.length === filteredTasks.length) {
                throw new Error('Task not found');
            }
            saveDbFile(filteredTasks);
            return filteredTasks;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
        return {
            readDbFile,
            saveDbFile,
            insertOne,
            deleteOne
        };
};