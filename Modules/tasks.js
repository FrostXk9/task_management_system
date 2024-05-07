// get tasks and single task
// assign user a task , see status of users task
// delete update a specific task
// get task history
// get, add, remove, update a task for specific user
// assign a task to all users

import {pool} from '../Config/config.js';
import tasks from '../Controllers/tasks.js';

const getTasks = async () => {

    const [tasks] = await pool.query(`
        SELECT * FROM tasks
    `);

    return tasks;

}

const getTask = async (taskId) => {

    const [task] = await pool.query(`
        SELECT * FROM tasks WHERE taskId = ?
    `, [taskId]);

    return task;

}

// admin usage only,
const addTask = async (taskname, taskdeadline, completed, created) => {

    const [result] = await pool.query(`
        INSERT INTO tasks (taskname, taskdeadline, completed, created)
        VALUES (?, ?, 0, CURRENT_TIMESTAMP)
    `, [taskname, taskdeadline, completed, created])

    return result.insertId
}

// for admin usage only
const deleteTask = async (taskId) => {

    const [targ] = await pool.query(`
        DELETE FROM tasks WHERE taskId = ?
    `, [taskId])

}

// for admin usage only
const editTask = async (taskname, taskdeadline, completed, created, taskId) => {
    const [task] = await pool.query(`
        UPDATE tasks SET taskname = ?, taskdeadline = ?, completed = ?, created = ? 
        WHERE taskId = ?
    `, [taskname, taskdeadline, completed, created, taskId])
}

// returns tasks from specific user
const usersTasks = async (user_id) => {
    const [result] = await pool.query(`
        SELECT tasks.* 
        FROM tasks
        JOIN 
        user_tasks ON tasks.taskId = user_tasks.taskId
        WHERE 
        user_tasks.user_id = ?
    `, [user_id])

    return result;
}


// SELECT 
// cart.quantity,
// products.product_price,
// (cart.quantity * products.product_price) AS total_price,
// products.product_img AS prodUrl,
// products.product_name AS prodName,
// products.product_id AS prodID
// FROM 
// cart
// JOIN 
// products ON cart.product_id = products.product_id
// WHERE 
// cart.user_id = ?
// console.log(await usersTasks(1));

const assignTaskToUser = async (taskId, userId) => {
    try {
        // Check if the user is already assigned to the task
        const [existingAssignment] = await pool.query(`
            SELECT * FROM user_tasks WHERE taskId = ? AND user_id = ?
        `, [taskId, userId]);

        // If the user is not already assigned to the task, insert the assignment
        if (!existingAssignment.length) {
            const [result] = await pool.query(`
                INSERT INTO user_tasks (taskId, user_id) 
                VALUES (?, ?)
            `, [taskId, userId]);

            console.log('Task assigned to user successfully');
            return result.insertId;
        } else {
            console.log('User is already assigned to the task');
            return null;
        }
    } catch (error) {
        console.error('Error assigning task to user:', error);
        return null;
    }
};


const UpdateTaskStatus = async (taskId) => {
    try {

        const [task] = await pool.query(`
            SELECT completed FROM tasks WHERE taskId = ?
        `, [taskId]);

        const isCompleted = tasks[0].completed ? 0 : 1

        if(isCompleted.completed === false){
            await pool.query(`
                UPDATE tasks SET completed = TRUE WHERE taskId = ?
            `,[isCompleted, taskId])
            return task;

        } else if (isCompleted.completed === true){
            await pool.query(`
                UPDATE tasks SET completed = FALSE WHERE taskId = ?
            `, [isCompleted, taskId])
            return task;
            
        }
    } catch (error) {
        console.error('Error trying to complete task:', error);
        return null;   
    }

}


const deletePersonalTask = async (taskId, user_id) => {
    const [task] = await pool.query(`
        DELETE FROM user_tasks WHERE taskId = ? AND user_id = ?
    `, [taskId, user_id])
}


export {
    getTasks, 
    getTask, 
    addTask, 
    deleteTask, 
    editTask, 
    usersTasks, 
    assignTaskToUser, 
    UpdateTaskStatus,
    deletePersonalTask
}