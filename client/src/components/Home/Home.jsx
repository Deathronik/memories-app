import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {getPosts, getPostsBySearch, getPostsNumberOfPages} from "../../features/posts/postsThunk";
import {Container, Grid, Grow, Paper, AppBar, TextField, Button} from "@material-ui/core";
import {useNavigate, useLocation} from "react-router-dom";

import ChipInput from "material-ui-chip-input";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Paginate from "../Paginate/Paginate";
import useStyles from "./styles";

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])

    const classes = useStyles()
    const dispatch = useDispatch()
    const query = useQuery()
    const navigate = useNavigate()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')
    const tagsQuery = query.get('tags')

    const numberOfPages = useSelector(state => state.posts.numberOfPages)

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            searchPost()
        }
    }

    const handleAddTag = (tag) => setTags([...tags, tag])
    const handleDeleteTag = (tagToDelete) => setTags(tags.filter(tag => tag !== tagToDelete))

    const searchPost = () => {
        if(search.trim() || tags.length > 0) {
            console.log(tags, search)
            dispatch(getPostsBySearch({search, tags: tags.join(',')}))
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.length === 0 ? 'none' : tags.join(',')}`)
        } else {
            navigate('/')
        }
    }

    useEffect(() => {
        if (searchQuery || tagsQuery) {
            dispatch(getPostsBySearch({search: searchQuery.trim(), tags: tagsQuery}))
            if (searchQuery && (searchQuery !== 'none')) {
                setSearch(searchQuery)
            }
            if (tagsQuery && (tagsQuery !== 'none')) {
                setTags(tagsQuery.split(','))
            }
            if (searchQuery === 'none' && tagsQuery === 'none') {
                navigate('/')
            }
        }

    }, [tagsQuery, searchQuery, dispatch, navigate])

    useEffect(() => {
        if (numberOfPages === 0) {
            dispatch(getPostsNumberOfPages())
        }
        if (numberOfPages === 1) {
            dispatch(getPosts(1))
        }
    }, [dispatch, numberOfPages])

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid className={`${classes.mainContainer} ${classes.gridContainer}`} container alignItems="stretch"
                      spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField name="search" variant="outlined" label="Search Memories" fullWidth value={search}
                                           onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPress}/>
                            <ChipInput style={{margin: "10px 0"}} value={tags} onAdd={handleAddTag}
                                       onDelete={handleDeleteTag} label="Search Tags" variant="outlined"/>
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>
                        <Form/>
                        {(!searchQuery && !tags.length && numberOfPages >= 2) && (
                            <Paper className={classes.pagination} elevation={6}>
                                <Paginate page={page}/>
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;