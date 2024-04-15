import controller from '../Controllers/user.js';
import express from 'express';

const router = express.Router()


router.route('/')
    .get(controller.fetchUsers)

router.route('/:id')
    .get(controller.fetchUser)



export default router