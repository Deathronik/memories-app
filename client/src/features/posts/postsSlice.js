import {createSlice} from "@reduxjs/toolkit";
import {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPostsBySearch,
    getPost,
    getPostsNumberOfPages, commentPost
} from "./postsThunk"

const initialState = {
    currentId: null,
    posts: [],
    recommendedPosts: [],
    post: null,
    currentPage: 1,
    numberOfPages: 0,
    isLoading: true
}

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setCurrentId: (state, action) => {
            state.currentId = action.payload
        },
        setRecommendedPosts: (state, action) => {
            state.recommendedPosts = action.payload
        }
    },
    extraReducers: {
        [getPost.pending]: (state) => {
            state.isLoading = true
        },
        [getPost.fulfilled]: (state, action) => {
            state.post = action.payload
            state.isLoading = false
        },
        [getPosts.pending]: (state) => {
            state.isLoading = true
        },
        [getPosts.fulfilled]: (state, action) => {
            state.posts = action.payload.posts
            state.currentPage = action.payload.currentPage
            state.numberOfPages = action.payload.numberOfPages
            state.isLoading = false
        },
        [getPostsBySearch.pending]: (state) => {
            state.isLoading = true
        },
        [getPostsBySearch.fulfilled]: (state, actions) => {
            state.posts = actions.payload
            state.isLoading = false
        },
        [getPostsNumberOfPages.pending]: (state) => {
            state.isLoading = true
        },
        [getPostsNumberOfPages.fulfilled]: (state, action) => {
            state.numberOfPages = action.payload.numberOfPages
        },
        [createPost.fulfilled]: (state, action) => {
            state.posts = [action.payload, ...state.posts]
        },
        [updatePost.fulfilled]: (state, action) => {
            state.posts = state.posts.map(post => post._id === action.payload._id ? action.payload : post)
        },
        [deletePost.fulfilled]: (state, action) => {
            state.posts = state.posts.filter(post => (post._id !== action.payload))
        },
        [likePost.fulfilled]: (state, action) => {
            state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
        },
        [commentPost.fulfilled]: (state, action) => {
            state.post.comments = action.payload.comments
        }
    }
})

export const {setCurrentId, setRecommendedPosts} = postsSlice.actions

export default postsSlice.reducer