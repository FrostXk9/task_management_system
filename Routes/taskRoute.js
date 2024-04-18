import controller from '../Controllers/tasks.js';
import express from 'express';

const router = express.Router()

router.route('/')
    .get(controller.fetchTasks)
    .post(controller.AddTask)



router.route('/:id')
    // http://localhost:3360/:id
    .get(controller.fetchTask)

    // fetch all tasks specific to user
    // http://localhost:3360?user_id=?
    .get(controller.userTasks)

    // assign task to another user
    // http://localhost:3360/:id/user_id=?
    .post(controller.assignTask)

    // user update task status
    // http://localhost:3360/:id
    .patch(controller.setTaskState)

    //admin usage
    // http://localhost:3360/:id
    .patch(controller.taskEdit)

    // deletes a users personal task
    // http://localhost:3360/:id/user_id=?
    .delete(controller.removePersonalTask) // user controller

    // admin usage
    // will also configure it to the user who sends a certain task
    // http://localhost:3360/:id
    .delete(controller.removeTask)












export default router