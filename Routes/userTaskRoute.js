import controller from '../Controllers/tasks.js';
import express from 'express';

const router = express.Router()

router.route('/:id')
    // fetch all tasks specific to user
    // http://localhost:3360?user_id=?
    .get(controller.userTasks)

    // assign task to another user
    // http://localhost:3360/:id/user_id=?
    .post(controller.assignTask)

    // user update task status
    // http://localhost:3360/:id
    .patch(controller.setTaskState)

    // deletes a users personal task
    // http://localhost:3360/:id/user_id=?
    .delete(controller.removePersonalTask)


export default router