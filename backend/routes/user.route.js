import express from 'express'
import verifyUser from '../middleware/verifyUser.js'
import { getFriends, getUser, SearchforAllusers, updateUser } from '../controller/user.controller.js'

const router = express.Router()


router.get('/getFriends', verifyUser, getFriends)
router.get('/search', SearchforAllusers)
router.get('/:id', getUser)
router.post('/:id', verifyUser, updateUser)


// router.get('/:id', verifyUser, getMessages)


export default router