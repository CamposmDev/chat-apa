import { useContext, useEffect, useRef, useState } from "react"
import { Box, Typography, List, Card, useTheme } from "@mui/material"
import { WS_URL } from "../util/Contants";
import { AuthContext } from "../context/auth";
import ContactCard from "./user/ContactCard";
import MessageBox from "./MessageBox";

const Workspace = () => {
    const auth = useContext(AuthContext)
    /** @type {[WebSocket, import('react').Dispatch<import('react').SetStateAction<WebSocket>>]} */
    const [ws, setWS] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState({});
    const [offlineUsers, setOfflineUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    // const selectedUserIdRef = useRef(selectedUserId);
    const [messages, setMessages] = useState([]);
    const theme = useTheme();
    const divMsg = useRef();

    useEffect(() => {
        initWS()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        async function fetchOfflineUsers() {
            if (Object.keys(onlineUsers).length < 0) return;
            let userIds = await auth.getAllUsers();
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
        if (selectedUserId) {
            auth.getMessagesFrom(selectedUserId).then(x => setMessages(x))
            // selectedUserIdRef.current = selectedUserId;
            ws.onmessage = handleMessage;
        }
        // eslint-disable-next-line
    }, [selectedUserId])

    useEffect(() => {
        const div = divMsg.current;
        // @ts-ignore
        if (div) div.scrollIntoView({ block: 'end' });
    }, [messages]);

    /**
     * Handles incoming messages from server
     * @param {MessageEvent} ev 
     */
    function handleMessage(ev) {
        // console.log(selectedUserIdRef)
        const payload = JSON.parse(ev.data)
        if ('online' in payload) {
            delete payload.online[auth.userId]
            setOnlineUsers(payload.online);
        } else if ('message' in payload) {
            const msg = payload.message;
            if (msg.sender === selectedUserId) {
                setMessages(prev => [...prev, msg]);
            } else {
                /**
                 * TODO - Implement some sort of notifcation for user messages 
                 */
            }
        }
    }

    function initWS() {
        function reconnect() {
            setTimeout(() => {
                console.log('Disconnected. Trying to reconnect.')
            }, 1000);
            initWS();
        }
        const ws = new WebSocket(WS_URL)
        ws.onopen = () => console.log(`Connected to ${WS_URL}`);
        ws.onmessage = handleMessage;
        ws.onclose = reconnect;
        setWS(ws)
    }

    const sendMessage = (message, file = null) => {
        ws.send(JSON.stringify({
            recipient: selectedUserId,
            text: message,
            file,
        }))
        const tempId = new Date();
        const tempMsg = {
            _id: tempId.toString(),
            sender: auth.userId,
            recipient: selectedUserId,
            text: message,
            createdAt: tempId
        }
        setMessages(prev => [...prev, tempMsg])
        // async function updateMessages() {
        //     const messages = await auth.getMessagesFrom(selectedUserId);
        //     setMessages(messages);
        // }
        // updateMessages();
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
        <Box >
            <Box m={1}>
                <Box display='flex' sx={{ height: '75vh', overflow: 'auto', scrollbarWidth: 'thin' }}>
                    {contactBox}
                    <Box flexGrow={1}>
                        {messages.map(x => {
                            let elem = (
                                <Box key={x._id} mb={1} display={'flex'}>
                                    <Box flexGrow={1} />
                                    <Card sx={{ paddingBlock: 1, paddingInline: 2, backgroundColor: theme.palette.primary.main, borderRadius: '16px' }}>
                                        <Typography color={'white'}>{x.text}</Typography>
                                    </Card>
                                </Box>
                            )
                            /* if the sender is NOT the user, then move the card to the right side */
                            if (x.sender !== auth.userId) {
                                elem = (
                                    <Box key={x._id} mb={1} display={'flex'}>
                                        <Card sx={{ paddingBlock: 1, paddingInline: 2, borderRadius: '16px' }}>
                                            <Typography>{x.text}</Typography>
                                        </Card>
                                        <Box flexGrow={1} />
                                    </Box>
                                )
                            }
                            return elem;
                        })}
                        <div ref={divMsg} />
                    </Box>
                </Box>
            </Box>
            <MessageBox callback={sendMessage} userId={selectedUserId} />
        </Box>
    )
}

export default Workspace