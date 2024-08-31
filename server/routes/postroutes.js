import express from 'express'
import { verifyToken} from '../utils/jwtauth.js'
import { create, getposts, deletepost, updatepost } from '../controllers/postcontroller.js'

const router= express.Router()

router.post('/create',verifyToken, create)
router.get('/getposts',getposts)
router.delete('/delete/:postid/:userid',verifyToken, deletepost)
router.post('/updatepost/:postid/:userid',verifyToken, updatepost)


export default router




