import { useContext, useEffect, useState } from "react";
import { AuthContext } from "src/context/auth";

const { Card, Typography, Avatar, CardContent, Stack } = require("@mui/material");

const ContactCard = (props) => {
    const auth = useContext(AuthContext);
    const [username, setUsername] = useState('');
    useEffect(() => {
        const fetchUsername = async function() {
            let arg = await auth.getUsername(props.userId);
            setUsername(arg);
        }
        fetchUsername();
    }, [])
    return (
        <Card onClick={props.callback}>
            <Stack flexDirection={"row"} alignItems={'center'} gap={1} margin={1}>
            <Avatar/>
            <Typography marginRight={1}>{username}</Typography>
            </Stack>
        </Card>
    );
}

export default ContactCard;