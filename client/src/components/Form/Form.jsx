import React, {useEffect, useState} from 'react';

import {TextField, Button, Typography, Paper} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {createPost, updatePost} from "../../features/posts/postsThunk";
import {setCurrentId} from "../../features/posts/postsSlice";
import {useSnackbar} from "notistack";

import useStyles from "./styles"
import FileBase from "react-file-base64"


const initialState = {
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
}

const Form = () => {
    const [postData, setPostData] = useState(initialState)
    const {posts, currentPage, currentId} = useSelector(state => state.posts)
    const { enqueueSnackbar } = useSnackbar()

    const user = useSelector(state => state.auth.userInfo)
    const dispatch = useDispatch()
    const classes = useStyles()

    const handleSubmit = (e) => {
        e.preventDefault()

        const tags = Array.from(new Set(postData.tags.split(" ")))

        if (currentId) {
            dispatch(updatePost({currentId: currentId, postData: {...postData, tags, name: user.name}, enqueueSnackbar}))
            clear()
        } else {
            dispatch(createPost({newPost: {...postData, tags, name: user.name}, enqueueSnackbar}))
            clear()
        }
    }

    useEffect(() => {
        if (currentId) {
            const currentPost = posts.find((post) => (post._id === currentId))
            setPostData({
                title: currentPost.title,
                message: currentPost.message,
                tags: currentPost.tags.join(" "),
                selectedFile: currentPost.selectedFile
            })
        }
    }, [currentId, posts])

    useEffect(() => {
        setPostData(initialState)
    }, [currentPage])

    const clear = () => {
        dispatch(setCurrentId(null))
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
    }

    if (!user?.name) {
        return (
            <Paper elevation={6}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories, leave comments, and like other`s memories
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form className={`${classes.form} ${classes.root}`} autoComplete="off" onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing a Memory' : 'Creating a Memory'}</Typography>
                <TextField name="title"
                           variant="outlined"
                           label="Title"
                           fullWidth
                           value={postData.title}
                           required
                           onChange={(e) => setPostData({...postData, title: e.target.value})}
                />
                <TextField name="message"
                           variant="outlined"
                           label="Message"
                           fullWidth
                           value={postData.message}
                           required
                           onChange={(e) => setPostData({...postData, message: e.target.value})}
                />
                <TextField name="tags"
                           variant="outlined"
                           label="Tags"
                           fullWidth
                           value={postData.tags}
                           required
                           onChange={(e) => setPostData({...postData, tags: e.target.value})}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                    />
                </div>
                <Button className={classes.buttonSubmit}
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        fullWidth>
                    Submit
                </Button>
                <Button variant="contained"
                        color="secondary"
                        size="small"
                        onClick={clear}
                        fullWidth>
                    Clear
                </Button>
            </form>
        </Paper>
    );
};

export default Form;