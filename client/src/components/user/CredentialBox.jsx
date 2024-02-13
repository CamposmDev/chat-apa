import { Avatar, Box, Typography } from "@mui/material"
import { stringAvatar } from "../../util/Common"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import AccountButton from "../appbar/AccountButton";
import StyledBadge from "./StyledBadge";

/**
 * 
 * @param {{userId: string, online?: boolean}} props 
 * @returns 
 */
const CredentialBox = ({ userId, online }) => {
    const auth = useContext(AuthContext);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUsername = async function () {
            let arg = await auth.getUsernameById(userId);
            setUsername(arg);
        }
        fetchUsername();
    })

    if (auth.userId === userId) {
        return <AccountButton username={username} />
    }
    return (
        <Box display={"flex"} alignItems={'center'} gap={1} >
            {online ? <StyledBadge overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: "right" }}
                variant="dot">
                <Avatar sx={stringAvatar(username)} />
            </StyledBadge> : <Avatar sx={stringAvatar(username)} />}
            <Typography marginRight={1}>{username}</Typography>
        </Box>
    )
}

export default CredentialBox;