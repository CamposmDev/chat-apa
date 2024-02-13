import { useContext, useEffect, useState } from "react"
import { Box, Stack, TextField, Button, Typography, List, Card, CardContent } from "@mui/material"
import { WS_URL } from "../util/Contants";
import { AuthContext } from "../context/auth";
import ContactCard from "./user/ContactCard";
import MessageBox from "./MessageBox";

const Chat = () => {
    const auth = useContext(AuthContext)
    const [ws, setWebSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState({});
    const [offlineUsers, setOfflineUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        initWebSocket()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        async function fetchOfflineUsers() {
            if (Object.keys(onlineUsers).length < 0) return;
            let userIds = await auth.getUsers();
            if (!userIds) return;
            // console.log(onlineUsers)
            userIds = userIds.filter(x => !(x._id in onlineUsers) && !(x._id === auth.userId));
            // console.log(userIds)
            setOfflineUsers(userIds)
        }
        fetchOfflineUsers();
        // eslint-disable-next-line
    }, [onlineUsers])

    useEffect(() => {
        async function fetchMessages() {
            const messages = await auth.getMessagesFrom(selectedUserId);
            setMessages(messages);
        }
        if (selectedUserId) fetchMessages();
        // eslint-disable-next-line
    }, [selectedUserId])

    const initWebSocket = () => {
        /**
         * Handles incoming messages from server
         * @param {MessageEvent} event 
         */
        const handleMessage = (event) => {
            const payload = JSON.parse(event.data)
            if ('online' in payload) {
                delete payload.online[auth.userId]
                setOnlineUsers(payload.online);
            } else if ('messages' in payload) {
                console.log(payload)
            }
        }
        const reconnect = () => {
            setTimeout(() => {
                console.log('Disconnected. Trying to reconnect.')
            }, 1000);
            initWebSocket();
        }
        const ws = new WebSocket(WS_URL)
        ws.addEventListener('open', () => console.log(`Connected to ${WS_URL}`))
        ws.addEventListener('message', handleMessage)
        ws.addEventListener('close', reconnect)
        setWebSocket(ws)
    }

    const sendMessage = (message, file = null) => {
        ws.send(JSON.stringify({
            recipient: selectedUserId,
            text: message,
            file,
        }))
        async function updateMessages() {
            const messages = await auth.getMessagesFrom(selectedUserId);
            setMessages(messages);
        }
        updateMessages();
        // if (file) {

        // } else {

        // }
    }

    const contactBox = (
        <List sx={{ mr: 1 }}>
            {Object.keys(onlineUsers).map(x => <ContactCard key={x}
                userId={x}
                callback={setSelectedUserId}
                isSelected={selectedUserId === x}
                online
            />)}
            {offlineUsers.map(x => <ContactCard key={x._id}
                userId={x._id}
                callback={setSelectedUserId}
                isSelected={selectedUserId === x._id}
            />)}
        </List>
    )

    return (
        <Box ml={1} gap={1}>
            <Box flexGrow={1} flexDirection={"column"}>
                <Box display='flex'>
                    {contactBox}
                    <Box flexGrow={1}>
                        {messages.map(x => {
                            let elem = (
                                <Box mb={1} display={'flex'}>
                                    <Box flexGrow={1} />
                                    <Card sx={{ p: 1 }}>
                                        <Typography>{x.text}</Typography>
                                    </Card>
                                </Box>
                            )
                            /* if the sender is the user, then move the card to the right side */
                            if (x.sender !== auth.userId) {
                                elem = (
                                    <Box mb={1} display={'flex'}>
                                        <Card sx={{ p: 1 }}>
                                            <Typography>{x.text}</Typography>
                                        </Card>
                                        <Box flexGrow={1} />
                                    </Box>
                                )
                            }
                            return elem;
                        })}
                    </Box>
                </Box>
            </Box>
            <MessageBox callback={sendMessage} userId={selectedUserId} />
        </Box>
    )
}

export default Chat