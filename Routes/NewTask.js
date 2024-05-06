import controller from '../Controllers/tasks.js';
import express from 'express';

const router = express.Router()
// user specific
router.route('/:id')

    // fetch all tasks specific to user
    // http://localhost:3360/:id
    .get(controller.userTasks)


export default router