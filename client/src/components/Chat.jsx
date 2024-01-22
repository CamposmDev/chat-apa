import { useEffect, useState } from "react"
import { Message } from "@mui/icons-material";

import { Box, Stack, Typography, Icon, TextField, Button } from "@mui/material"

const Chat = () => {
    const [ws, setWebSocket] = useState(null);
    const [users, setUsers] = useState([])
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:4000")
        setWebSocket(ws)
        ws.addEventListener('message', handleMessage)
    }, [])

    const handleMessage = (event) => {
        let arr = JSON.parse(event.data)
        setUsers(arr);
    }
    return (
        <Stack direction={"row"} sx={{ ml: 1 }} spacing={1}>
            <Stack sx={{pr: 4}}>
                <Stack direction={'row'} alignItems={'center'} sx={{ mt: 1 }}>
                    <Icon sx={{ mr: 1 }} color="primary">
                        <Message />
                    </Icon>
                    <Typography color={'primary'} variant="h6"><b>Chat App</b></Typography>
                </Stack>
                <Typography>Contacts</Typography>
            </Stack>
            <Box flexGrow={1} flexDirection={'column'} display={'flex'} sx={{height: '100vh', justifyContent: 'space-between' }}>
                <Box sx={{flewGrow: 1, overflowY: 'auto'}}>
                    hi
                </Box>
                <Stack direction={'row'} sx={{padding: 2}}>
                    <TextField label={'Message'} fullWidth size="small" />
                    <Button variant="contained">Send</Button>
                </Stack>
            </Box>
        </Stack>
    )
}

export default Chat