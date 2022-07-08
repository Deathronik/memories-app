import React, {useState} from 'react';

import {Avatar, Button, Paper, Grid, Typography, Container} from "@material-ui/core";
import {useGoogleLogin} from "@react-oauth/google"
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {useDispatch} from "react-redux";
import {createUser, loginUser} from "../../features/auth/authThunk";
import {useSnackbar} from "notistack";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import useStyles from './styles'
import Input from "./Input/Input";
import Icon from "./Icon/Icon";
import * as api from "../../api";

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {
    const { enqueueSnackbar } = useSnackbar()

    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [formData, setFormData] = useState(initialState)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const classes = useStyles()
    const {login} = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (isSignUp) {
            dispatch(createUser({formData, enqueueSnackbar}))
        } else {
            dispatch(loginUser({email: formData.email, password: formData.password, enqueueSnackbar}))
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
    }

    const googleLogin = useGoogleLogin({
        onSuccess: async (successResponse) => {
            try {
                const response = await api.getGoogleAccessAndIdTokens(successResponse.code)
                const userInfoResponse = await api.getGoogleUserInfo(response.data.access_token)
                login(response.data.id_token, userInfoResponse.data)
                navigate("/")
            } catch (e) {
                console.log(e.message)
            }
        },
        onError: errorResponse => console.log(errorResponse),
        flow: "auth-code"
    });

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name="email" label="Email" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange}
                               type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange}
                                            type="password"/>}
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {isSignUp ? "Sign Up" : "Sign In"}
                        </Button>
                        <Button className={classes.googleButton}
                                onClick={() => googleLogin()}
                                color="primary"
                                fullWidth
                                startIcon={<Icon/>}
                                variant="contained"
                        >
                            Google Sign In
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignUp ? 'Already have an account? Sign In' : 'Don`t have an account? Sign Up'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;