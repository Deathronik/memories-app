import React from "react";

import {Grid, CircularProgress, Typography} from "@material-ui/core";
import {useSelector} from "react-redux";

import Post from "./Post/Post"
import useStyles from "./styles"

const Posts = () => {
    const {posts, isLoading} = useSelector((state) => state.posts)
    const classes = useStyles()

    if (!posts.length && !isLoading) {
        return (
            <Typography align="center" variant="h4" component="h2">No Posts</Typography>
        )
    }

    if (isLoading) {
        return (
            <div align="center">
                <CircularProgress size="4em"/>
            </div>
        )
    }

    return (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                    <Post post={post}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default Posts;