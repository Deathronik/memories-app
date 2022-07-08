import {Router} from "express";
import {getPost, getPosts, getPostsBySearch, getCountOfPages, createPost, updatePost, deletePost, likePost, commentPost} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = Router()

router.get('/', getPosts)
router.post('/', auth, createPost)
router.get('/search', getPostsBySearch)
router.get('/pagesCount', getCountOfPages)
router.get('/:id', getPost)

router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/like', auth, likePost)
router.post('/:id/comment', auth, commentPost)

export default router