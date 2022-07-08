import React, {useState} from 'react';

import {Typography, TextField, Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {commentPost} from "../../../features/posts/postsThunk";

import useStyles from "./styles"

const CommentSection = ({post}) => {
    const classes = useStyles()
    const [comment, setComment] = useState("")

    const {userInfo, isAuth} = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const handleClick = async () => {
        const finalComment = `${userInfo.name}: ${comment}`

        dispatch(commentPost({comment: finalComment, id: post._id}))
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {post?.comments.map((comment, index) => (
                        <Typography key={index} gutterBottom variant="subtitle1">
                            <strong>{`${comment.split(": ")[0]}:`}</strong>
                            {comment.split(":")[1]}
                        </Typography>
                    ))}
                </div>
                {isAuth && (
                    <div style={{width: '60%'}}>
                        <Typography gutterBottom variant="h6">Write a Comment</Typography>
                        <TextField
                            fullWidth
                            minRows={4}
                            variant="outlined"
                            label="Your Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{marginTop: "10px"}} fullWidth disabled={!comment} variant="contained" onClick={handleClick} color="primary">Comment</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentSection;