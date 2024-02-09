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
    const [onlineUsers, setOnlineUsers] = useState({});
    const [offlineUsers, setOfflineUsers] = useState({});
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([])
    useEffect(() => {
        initWebSocket()
    }, [])

    const initWebSocket = () => {
        const handleMessage = (event) => {
            let arr = JSON.parse(event.data)
            console.log(arr)
            setUsers(arr);
        }
        const reconnect = () => {
            setTimeout(() => {
                console.log('Disconnected. Trying to reconnect.')
            }, 1000);
            initWebSocket();
        }
        const ws = new WebSocket(WS_URL)
        ws.addEventListener('open', () => console.log("Connected to " + WS_URL))
        ws.addEventListener('message', handleMessage)
        ws.addEventListener('close', reconnect)
        setWebSocket(ws)
    }

    let contacts = (users.length > 0) ? users.map(x => {
        if (x === auth.userId) return <div/>
        return <ContactCard key={x} userId={x} callback={setSelectedUserId} />
    }) : <div />;

    const sendMessage = (ev, file = null) => {
        ev.preventDefault()
        ws.send(JSON.stringify({
            recipient: selectedUserId,
            text: message,
            file,
        }))
        // if (file) {

        // } else {

        // }
    }

    return (
        <Stack direction={"row"} sx={{ ml: 1 }} spacing={1}>
            <Stack pr={1}>
                <Logo />
                <Stack spacing={1} flexGrow={1}>
                    {contacts}
                </Stack>
                {/* <ContactCard userId={auth.userId}/> */}
            </Stack>
            <Box flexGrow={1} flexDirection={'column'} display={'flex'} sx={{ height: '100vh', justifyContent: 'space-between' }}>
                <Box sx={{ flewGrow: 1, overflowY: 'auto' }}>
                    hi
                </Box>
                <Box component={'form'} onSubmit={sendMessage}>
                    <Stack direction={'row'} sx={{ padding: 2 }}>
                        <TextField label={'Message'} name="message" fullWidth size="small" disabled={selectedUserId === null} onChange={(ev) => {
                            setMessage(ev.target.value);
                        }} />
                        <Button type="submit" variant="contained" disabled={selectedUserId === null}>Send</Button>
                    </Stack>
                </Box>
            </Box>
        </Stack>
    )
}

export default Chat