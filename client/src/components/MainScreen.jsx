import { Container } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import Chat from "./Chat";

const MainScreen = () => {
    const auth = useContext(AuthContext)
    const nav = useNavigate()

    useEffect(() => {
        if (!auth.loggedIn) {
            nav('/login')
        }
        // eslint-disable-next-line
    }, [])

    if (auth.loggedIn) {
        return <Chat/>
    }

    return (
        <Container>
        </Container>
    )
}

export default MainScreen;