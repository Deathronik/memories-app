import {createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../../api";

export const createUser = createAsyncThunk(
    'auth/createUser',
    async (payload) => {
        try {
            const response = await api.register(payload.formData)
            return response.data
        } catch (e) {
            payload.enqueueSnackbar(e.response.data.message, {variant: 'error'})
            console.log(e.response.data.message)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (payload) => {
        try {
            const response = await api.login(payload.email, payload.password)
            return response.data
        } catch (e) {
            payload.enqueueSnackbar(e.response.data.message, {variant: 'error'})
            console.log(e.response.data.message)
        }
    }
)