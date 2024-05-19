import controller from '../Controllers/tasks.js';
import express from 'express';

const router = express.Router()

router.route('/')
    .post(controller.assignTask) 


export default router;

