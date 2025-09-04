import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createPost, deletepost, getposts, updatePost } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createPost)
router.get('/getposts', getposts)
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)
router.put('/updatepost/:postId/:userId', verifyToken, updatePost)


export default router;