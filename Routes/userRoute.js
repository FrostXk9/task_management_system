import controller from '../Controllers/user.js';
import express from 'express';
import onHash from '../Middleware/encryptPwd.js';

const router = express.Router()

// password too long check the data type in the DB
router.route('/')
    .get(controller.fetchUsers)
    .post(controller.insertUserToDB)

router.route('/:id')
    .get(controller.fetchUser)
    .delete(controller.removeUserFromDB)
    .patch(controller.updateExistingUser)



export default router