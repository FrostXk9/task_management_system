import controller from '../Controllers/tasks.js';
import express from 'express';

const router = express.Router()

router.route('/')
    .get(controller.fetchTasks)
    .post(controller.AddTask)



router.route('/:id')
    // http://localhost:3360/:id
    .get(controller.fetchTask)

    // http://localhost:3360/:id/user_id=?
    .post(controller.assignTask)

    // http://localhost:3360/:id
    .patch(controller.taskEdit)

    // http://localhost:3360/:id/user_id=?
    .delete(controller.removePersonalTask) // user controller

    // http://localhost:3360/:id
    .delete(controller.removeTask)












export default router