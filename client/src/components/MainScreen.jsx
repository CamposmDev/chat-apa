import { Container } from "@mui/material";
import { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { AuthContext } from "src/context/auth";

const MainScreen = () => {
    const auth = useContext(AuthContext)
    // console.log(auth)
    // const nav = useNavigate()

    
    useEffect(() => {
        if (!auth.user) {
            // nav('/login')
        }
    // eslint-disable-next-line
    }, [auth])

    return (
        <Container>

        </Container>
    )
}

export default MainScreen;