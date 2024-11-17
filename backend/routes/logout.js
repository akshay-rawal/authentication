import express from 'express'
import authMiddleware from '../middleware/auth.js'


const router = express.Router();

router.post('/logout',authMiddleware, (req,res)=>{
    console.log("Logout request for user ID:", req.userId);
           res.status(200).json({message:"token is valid"})
})













export default router