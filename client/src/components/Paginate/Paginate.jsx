import React, {useEffect} from 'react';

import { Pagination, PaginationItem } from "@material-ui/lab";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../features/posts/postsThunk";
import {setCurrentId} from "../../features/posts/postsSlice";

import useStyles from "./styles"

const Paginate = ({ page }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const numberOfPages = useSelector(state => state.posts.numberOfPages)

    useEffect(() => {
        if (page && numberOfPages > 1) {
            dispatch(getPosts(page))
            dispatch(setCurrentId(null))
        }
    }, [page, dispatch, numberOfPages])

    return (
        <Pagination classes={{ul: classes.ul}} count={numberOfPages} page={Number(page) || 1} color="primary" variant="outlined" renderItem={(item) => (
            <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>
        )}/>
    );
};

export default Paginate;