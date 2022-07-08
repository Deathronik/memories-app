import axios from "axios"

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE"
    }
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchPosts = (page) => API.get(`/posts?page=${page}`)
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags.length === 0 ? 'none' : searchQuery.tags}`)
export const fetchPostsNumberOfPages = () => API.get('/posts/pagesCount')
export const createPost = (newPost) => API.post("/posts", {post: newPost})
export const updatePost = (currentId, updatePost) => API.patch(`/posts/${currentId}`, {post: updatePost})
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const likePost = (id) => API.patch(`/posts/${id}/like`)
export const commentPost = (comment, id) => API.post(`/posts/${id}/comment`, {comment})

export const getGoogleAccessAndIdTokens = (code) => axios.post("https://oauth2.googleapis.com/token", {
        code,
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.REACT_APP_BASE_URL,
        grant_type: "authorization_code"
    })
export const getGoogleUserInfo = (oauth2Token) => axios.get("https://www.googleapis.com/oauth2/v1/userinfo", {
    headers: {
        "Authorization": `Bearer ${oauth2Token}`
    }
})

export const login = (email, password) => API.post("/user/login", {email, password})
export const register = (userData) => API.post("/user/register", {...userData})