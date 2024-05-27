import controllers from '../Controllers/messages.js';
import express from 'express';

const router = express.Router()


router.route('/')
    .get(controllers.allMsgs)


router.route('/:id')
    .get(controllers.singleMessage)
    .post(controllers.sendToPeer)


export default router;