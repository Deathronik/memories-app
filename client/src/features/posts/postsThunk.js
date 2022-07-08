import {createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../../api";

export const getPost = createAsyncThunk(
    'posts/getPost',
    async (id) => {
        try {
            const response = await api.fetchPost(id)
            return response.data
        } catch (e) {
            console.log(e.message)
        }
    }
)

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (page) => {
        try {
            const response = await api.fetchPosts(page)
            return response.data
        } catch (e) {
            console.log(e.response.data)
        }
    }
)

export const getPostsBySearch = createAsyncThunk(
    'posts/getPostsBySearch',
    async (searchQuery) => {
        try {
            const response = await api.fetchPostsBySearch(searchQuery)
            return response.data
        } catch (e) {
            console.log(e.response.data)
        }
    }
)

export const getPostsNumberOfPages = createAsyncThunk(
    'posts/getPostsNumberOfPages',
    async () => {
        try {
            const response = await api.fetchPostsNumberOfPages()
            return response.data
        } catch (e) {
            console.log(e.response.data)
        }
    }
)

export const createPost = createAsyncThunk(
    'posts/createPosts',
    async (payload) => {
        try {
            const response = await api.createPost(payload.newPost)
            payload.enqueueSnackbar('The post has been successfully created', {variant: 'success'})
            return response.data
        } catch (e) {
            console.log(e.response.data)
        }
    }
)

export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async (payload) => {
        try {
            const response = await api.updatePost(payload.currentId, payload.postData)
            payload.enqueueSnackbar('The post has been successfully updated', {variant: 'success'})
            return response.data
        } catch (e) {
            console.log(e.response.data)
        }
    }
)

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (payload) => {
        try {
            await api.deletePost(payload.id)
            payload.enqueueSnackbar('The post has been successfully deleted', {variant: 'success'})
            return payload.id
        } catch (e) {
            console.log(e.response.data)
        }
    }
)

export const likePost = createAsyncThunk(
    'posts/likePost',
    async (id) => {
        try {
            const response = await api.likePost(id)
            return response.data
        } catch (e) {
            console.log(e.response.data)
        }
    }
)

export const commentPost = createAsyncThunk(
    'posts/comment',
    async (payload) => {
        try {
            const response = await api.commentPost(payload.comment, payload.id)
            return response.data
        } catch (e) {
            console.log(e.response.data)
        }
    }
)