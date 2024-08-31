import express from "express"
import { verifyToken } from "../utils/jwtauth.js"
import { createcomment, getcomments ,editcomment, deletecomment,likecomment} from "../controllers/commentcontroller.js"

const router = express.Router()


router.post('/create', verifyToken, createcomment)
router.get('/getcomments/:postid', getcomments )
router.post('/editcomment/:commid', verifyToken, editcomment)
router.delete('/deletecomment/:commid', verifyToken, deletecomment)
router.put('/likecomment/:commid',verifyToken, likecomment)



export default router