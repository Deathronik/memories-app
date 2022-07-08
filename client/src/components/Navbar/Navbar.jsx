import React from 'react';

import {AppBar, Avatar, Button, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useAuth} from "../../hooks/useAuth";

import memoriesText from "../../images/memoriesText.png";
import memoriesLogo from "../../images/memoriesLogo.png"
import useStyles from "./styles"

const Navbar = () => {
    const user = useSelector(state => state.auth.userInfo)

    const classes = useStyles()
    const {logout} = useAuth()

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img className={classes.image} src={memoriesText} alt="memories" height="60"/>
                <img className={classes.image} src={memoriesLogo} alt="memories" height="60"/>
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.name} src={user.picture}>{user.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <div>
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;