import {useCallback, useEffect} from "react";
import {useDispatch} from "react-redux";
import {setIsAuth, setToken, setUserInfo} from "../features/auth/authSlice";
import {useLocation, useNavigate} from "react-router-dom";
import decode from "jwt-decode"

export const useAuth = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const login = useCallback((token, userInfo) => {
        localStorage.setItem("token", token)
        localStorage.setItem("userInfo", JSON.stringify(userInfo))
        dispatch(setToken(token))
        dispatch(setUserInfo(userInfo))
        dispatch(setIsAuth(true))
    }, [dispatch])

    const logout = useCallback(() => {
        localStorage.removeItem("token")
        localStorage.removeItem("userInfo")
        dispatch(setToken(null))
        dispatch(setUserInfo(null))
        dispatch(setIsAuth(false))
        navigate("/")
    }, [dispatch, navigate])


    useEffect(() => {
        const token = localStorage.getItem("token")
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))

        if (token && userInfo) {
            const decodedToken = decode(token)

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout()
            } else {
                login(token, userInfo)
            }
        }
    }, [login, logout, location, dispatch])

    return {login, logout}
}