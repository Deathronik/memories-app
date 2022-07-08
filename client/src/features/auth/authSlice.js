import {createSlice} from "@reduxjs/toolkit";
import {createUser, loginUser} from "./authThunk";

const initialState = {
    token: null,
    userInfo: null,
    isAuth: false
}

const login = (token, userInfo) => {
    localStorage.setItem("token", token)
    localStorage.setItem("userInfo", JSON.stringify(userInfo))
}

export const postsSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload
        }
    },
    extraReducers: {
        [createUser.fulfilled]: (state, action) => {
            login(action.payload.token, action.payload.userInfo)
            state.token = action.payload.token
            state.userInfo = action.payload.userInfo
            state.isAuth = true
        },
        [loginUser.fulfilled]: (state, action) => {
            login(action.payload.token, action.payload.userInfo)
            state.token = action.payload.token
            state.userInfo = action.payload.userInfo
            state.isAuth = true
        }
    }
})

export const {setToken, setUserInfo, setIsAuth} = postsSlice.actions

export default postsSlice.reducer