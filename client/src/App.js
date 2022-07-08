import {Container} from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import {useRoutes} from "./hooks/useRoutes";
import {useSelector} from "react-redux";

function App() {
    const isAuth = useSelector(state => state.auth.isAuth)
    const routes = useRoutes(isAuth)

    return (
        <Container maxWidth="xl">
            <Navbar/>
            {routes}
        </Container>
    )
}

export default App;
