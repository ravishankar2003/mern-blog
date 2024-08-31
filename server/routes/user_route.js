import express from 'express';
import {signout, updateprofile, deleteprofile, getusers, deleteuser, getuser} from '../controllers/usercontroller.js';
import { verifyToken} from '../utils/jwtauth.js'


const router = express.Router();

router.post('/signout', signout);
router.post('/updateprofile',verifyToken, updateprofile);
router.delete('/deleteprofile',verifyToken, deleteprofile);
router.get('/getusers',verifyToken, getusers);
router.delete('/deleteuser/:userid', verifyToken, deleteuser)
router.get("/getuser/:userid", getuser)



export default router;