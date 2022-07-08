import React, {useEffect} from "react";

import {Paper, Typography, CircularProgress, Divider} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {useParams, useNavigate} from "react-router-dom";
import {getPost, getPostsBySearch} from "../../features/posts/postsThunk";
import {setRecommendedPosts} from "../../features/posts/postsSlice";

import moment from "moment"
import useStyles from "./styles"
import noImg from "../../images/noImg.png"
import CommentSection from "./CommentSection/CommentSection";

const PostDetails = () => {
    const {post, posts, isLoading, recommendedPosts} = useSelector(state => state.posts)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const classes = useStyles()
    const {id} = useParams()

    useEffect(() => {
        if (id){
            dispatch(getPost(id))
        }
    }, [id, dispatch])

    useEffect(() => {
        if (post?._id === id) {
            dispatch(getPostsBySearch({search: 'none', tags: post?.tags.join(',')}))
        }
    }, [post, id, dispatch])

    useEffect(() => {
        if (posts.length && post?._id === id) {
            dispatch(setRecommendedPosts(posts.filter((recommendedPosts) => recommendedPosts?._id !== post?._id)))
        }
    }, [post, posts, id, dispatch])

    const openPost = (_id) => {
        navigate(`/posts/${_id}`)
    }

    if (!post && !isLoading) {
        return (
            <Typography align="center" variant="h4" component="h2">Post Not Found</Typography>
        )
    }

    if (isLoading) {
        return (
            <Paper className={classes.loadingPaper}>
                <CircularProgress size="7em"/>
            </Paper>
        )
    }

    return (
        <Paper style={{padding: "20px", borderRadius: "15px"}} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary"
                                component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                    <Typography color="textSecondary" variant="h6">Created by: {post.name}</Typography>
                    <Typography color="textSecondary" variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                    <Divider style={{margin: '20px 0'}}/>
                    <CommentSection post={post}/>
                    <Divider style={{margin: '20px 0'}}/>
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media}
                         src={post.selectedFile || noImg}
                         alt={post.title}/>
                </div>
            </div>
            {recommendedPosts.length !== 0 && (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">You might also like</Typography>
                    <Divider/>
                    <div className={classes.recommendedPosts}>
                        {post?._id === id && recommendedPosts.map(({title, message, name, likes, selectedFile, _id}) => (
                            <div key={_id} style={{margin: "20px", cursor: "pointer"}} onClick={() => openPost(_id)}>
                                <Typography className={classes.titleOverflow} gutterBottom variant="h6">{title}</Typography>
                                <Typography gutterBottom variant="subtitle2"><strong>{name}</strong></Typography>
                                <Typography className={classes.messageOverflow} gutterBottom variant="subtitle2">{message}</Typography>
                                <Typography color="textSecondary" gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                                <img className={classes.recommendedMedia} src={selectedFile || noImg} width="200px" alt={title}/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Paper>
    )
}

export default PostDetails