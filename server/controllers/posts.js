import PostMessage from "../models/postMessage.js";

export const getPost = async (req, res) => {
    try {
        const {id} = req.params
        const post = await PostMessage.findById(id)

        if (!post) {
            return res.status(404).json({message: "Post Not Found"})
        }

        res.status(200).json(post)
    } catch (e) {
        res.status(500).json({message: "Some error, please try again..."})
    }
}

export const getPosts = async (req, res) => {
    try {
        const {page} = req.query

        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT
        const total = await PostMessage.countDocuments({})

        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex)

        if (!posts) {
            return res.status(404).json({message: "Posts Not Found"})
        }

        res.status(200).json({posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)})
    } catch (e) {
        res.status(500).json({message: "Some error, please try again..."})
    }
}

export const getPostsBySearch = async (req, res) => {
    try {
        const {searchQuery, tags} = req.query
        const text = new RegExp(searchQuery, 'i')

        const posts = await PostMessage.find({$or: [{title: text}, {message: text}, {tags: {$in: tags.split(',')}}]})

        if (!posts) {
            return res.status(404).json({message: "Posts Not Found"})
        }

        res.status(200).json(posts)
    } catch (e) {
        res.status(500).json({message: "Some error, please try again..."})
    }
}

export const getCountOfPages = async (req, res) => {
    try {
        const LIMIT = 8;
        const total = await PostMessage.countDocuments({})

        res.status(200).json({numberOfPages: Math.ceil(total / LIMIT)})
    } catch (e) {
        res.status(500).json({message: "Some error, please try again..."})
    }
}

export const createPost = async (req, res) => {
    try {
        const {post} = req.body
        const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()})

        await newPost.save()

        res.status(201).json(newPost)
    } catch (e) {
        res.status(409).json({message: "Conflict"})
    }
}

export const updatePost = async (req, res) => {
    try {
        const {id} = req.params
        const {post} = req.body

        const updatedPost = await PostMessage.findOneAndUpdate({_id: id, creator: req.userId}, post, {new: true})

        if (!updatedPost) {
            return res.status(404).send('Post not found')
        }

        res.json(updatedPost)
    } catch (e) {
        res.status(500).json({message: "Some error, please try again..."})
    }
}

export const deletePost = async (req, res) => {
    try {
        const {id} = req.params

        const deletedPost = await PostMessage.findOneAndRemove({_id: id, creator: req.userId})

        if (!deletedPost) {
            return res.status(404).send('Post not found')
        }

        res.json({message: "Post deleted successfully"})
    } catch (e) {
        res.status(500).json({message: "Some error, please try again..."})
    }
}

export const likePost = async (req, res) => {
    try {
        const {id} = req.params

        const post = await PostMessage.findById(id)

        if (!post) {
            return res.status(404).send('No post with that id')
        }

        const index = post.likes.findIndex((id) => id === String(req.userId))

        if (index === -1) {
            post.likes.push(req.userId)
        } else {
            post.likes = post.likes.filter((id) => id !== String(req.userId))
        }

        const likedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true})

        if (!likedPost) {
            return res.status(404).send('No post with that id')
        }

        res.json(likedPost)
    } catch (e) {
        res.status(500).json({message: "Some error, please try again..."})
    }
}

export const commentPost = async (req, res) => {
    try {
        const {id} = req.params
        const {comment} = req.body

        const post = await PostMessage.findById(id)

        post.comments.push(comment)

        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true})

        res.json(updatedPost)
    } catch (e) {
        res.status(500).json({message: "Some error, please try again..."})
    }
}