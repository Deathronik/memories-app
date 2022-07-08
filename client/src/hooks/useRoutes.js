import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../components/Home/Home";
import Auth from "../components/Auth/Auth";
import PostDetails from "../components/PostDetails/PostDetails";

export const useRoutes = (isAuth) => {
    if (isAuth) {
        return (
            <Routes>
                <Route path="/" element={<Navigate to="/posts" replace/>}/>
                <Route path="/posts" element={<Home/>} exact/>
                <Route path="/posts/search" element={<Home/>} exact/>
                <Route path="/posts/:id" element={<PostDetails/>}/>
                <Route path="*" element={<Navigate to="/posts" replace/>}/>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/posts" replace/>}/>
            <Route path="/posts" element={<Home/>} exact/>
            <Route path="/posts/search" element={<Home/>} exact/>
            <Route path="/posts/:id" element={<PostDetails/>}/>
            <Route path="/auth" element={<Auth/>} exact/>
            <Route path="*" element={<Navigate to="/posts" replace/>}/>
        </Routes>
    )
}