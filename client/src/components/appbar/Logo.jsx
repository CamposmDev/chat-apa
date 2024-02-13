import { AppBar, Icon, Toolbar, Typography } from "@mui/material"
import { Message } from "@mui/icons-material"
import CredentialBox from "../user/CredentialBox"
import { useContext } from "react"
import { AuthContext } from "../../context/auth"

const Logo = () => {
    const auth = useContext(AuthContext)
    return (
        <AppBar position="relative">
            <Toolbar variant="dense">
                <Icon sx={{ mr: 1 }}>
                    <Message />
                </Icon>
                <Typography flexGrow={1} variant="h6"><b>WhosApp</b></Typography>
                <CredentialBox userId={auth.userId}/>
            </Toolbar>
        </AppBar>
    )
}

export default Logo