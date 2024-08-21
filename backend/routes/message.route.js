import express from 'express'
import { sendMessage, getMessages } from '../controller/message.controller.js'
import verifyUser from '../middleware/verifyUser.js'

const router = express.Router()


router.post('/send/:id', verifyUser, sendMessage)
router.get('/:id', verifyUser, getMessages)


export default router