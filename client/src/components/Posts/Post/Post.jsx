import React, {useState} from 'react';

import {Card, CardActions, CardContent, CardMedia, Button, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentId} from "../../../features/posts/postsSlice";
import {deletePost, likePost} from "../../../features/posts/postsThunk";
import {useNavigate} from "react-router-dom"
import {useSnackbar} from "notistack";

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from "moment"
import useStyles from "./styles"

import Likes from "./Likes/Likes";
import noImg from "../../../images/noImg.png";

const Post = ({post}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.userInfo)
    const navigate = useNavigate()
    const [likes, setLikes] = useState(post.likes)

    const { enqueueSnackbar } = useSnackbar()

    const openPost = () => {
        navigate(`/posts/${post._id}`)
    }

    const userId = user?.id || user?._id
    const hasLikedPost = post?.likes.find((like) => like === userId)

    const handleLike = () => {
        dispatch(likePost(post._id))

        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId))
        } else {
            setLikes([...post.likes, userId])
        }
    }

    return (
        <Card className={classes.card} raised evelation={6}>
            <div>
                <div onClick={openPost} className={classes.openPost}>
                    <CardMedia className={classes.media} image={post.selectedFile || noImg} title={post.title}/>
                    <div className={classes.overlay}>
                        <Typography variant="h6">{post.name}</Typography>
                        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                    </div>
                </div>
                {(user?.id === post.creator || user?._id === post.creator) && (
                    <div className={classes.overlay2}>
                        <Button style={{color: "white"}} size="small" onClick={() => dispatch(setCurrentId(post._id))}>
                            <MoreHorizIcon/>
                        </Button>
                    </div>
                )}
                <div onClick={openPost} className={classes.openPost}>
                    <div className={classes.tags}>
                        <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    </div>
                    <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
                    <CardContent>
                        <Typography className={classes.message} variant="body2" color="textSecondary"
                                    component="p">{post.message}</Typography>
                    </CardContent>
                </div>
            </div>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user} onClick={handleLike}>
                    <Likes likes={likes} user={user}/>
                </Button>
                {(user?.id === post.creator || user?._id === post.creator) && (
                    <Button size="small" color="secondary" onClick={() => dispatch(deletePost({id: post._id, enqueueSnackbar}))}>
                        <DeleteIcon/>
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default Post;