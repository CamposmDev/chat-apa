import { useContext, useEffect, useState } from "react"
import { Message } from "@mui/icons-material";

import { Box, Stack, Typography, Icon, TextField, Button } from "@mui/material"
import { WS_URL } from "src/util/Contants";
import { AuthContext } from "src/context/auth";
import ContactCard from "./ContactCard";
import Logo from "./Logo";

const Chat = () => {
    const auth = useContext(AuthContext)
    const [ws, setWebSocket] = useState(null);
    const [users, setUsers] = useState([])
    useEffect(() => {
        const ws = new WebSocket(WS_URL)
        setWebSocket(ws)
        ws.addEventListener('message', handleMessage)
    }, [])

    const handleMessage = (event) => {
        let arr = JSON.parse(event.data)
        console.log(arr)
        setUsers(arr);
    }
    let contacts = <></>
    if (users.length > 0) {
        contacts = users.map(x => {
            if (x === auth.userId) return <></>
            return <ContactCard key={x} userId={x}/>
        })
    }
    return (
        <Stack direction={"row"} sx={{ ml: 1 }} spacing={1}>
            <Stack pr={1}>
                <Logo/>
                <Stack spacing={1} flexGrow={1}>
                    {contacts}
                </Stack>
                <Typography>{auth.userId}</Typography>
            </Stack>
            <Box flexGrow={1} flexDirection={'column'} display={'flex'} sx={{height: '100vh', justifyContent: 'space-between' }}>
                <Box sx={{flewGrow: 1, overflowY: 'auto'}}>
                    hi
                </Box>
                <Stack direction={'row'} sx={{padding: 2}}>
                    <TextField label={'Message'} name="message"  fullWidth size="small" />
                    <Button variant="contained">Send</Button>
                </Stack>
            </Box>
        </Stack>
    )
}

export default Chat