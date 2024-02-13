import { Box, Container } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import Chat from "./Chat";
import Logo from "./appbar/Logo";

const MainScreen = () => {
    const auth = useContext(AuthContext)
    const nav = useNavigate()

    useEffect(() => {
        if (auth.isLoggedIn) {
            nav('/')
        } else {
            nav('/login')
        }
        // eslint-disable-next-line
    }, [auth])

    if (auth.isLoggedIn) {
        return (
            <Box>
                <Logo />
                <Chat />
            </Box>
        )
    }

    return (
        <Container>
        </Container>
    )
}

export default MainScreen;