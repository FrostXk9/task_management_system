import controllers from '../Controllers/messages.js';
import express from 'express';

const router = express.Router()


router.route('/')
    .get(controllers.allMsgs)
    .post(controllers.sendToPeer)


router.route('/:id')
    .get(controllers.singleMessage)
    .delete(controllers.delMsg)


export default router;