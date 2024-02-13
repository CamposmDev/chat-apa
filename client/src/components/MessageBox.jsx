import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const MessageBox = ({ callback, userId }) => {
    const [message, setMessage] = useState('');

    const sendMessage = (ev) => {
        ev.preventDefault();
        /* send message */
        callback(message);
        /* clear the text field after sending the message */
        setMessage('');
    }

    return (
        <Box component={'form'} onSubmit={sendMessage} sx={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
            <Box display={'flex'} sx={{ padding: 2 }}>
                <TextField label={'Message'}
                    fullWidth
                    size="small"
                    disabled={!Boolean(userId)}
                    onChange={(ev) => {
                        setMessage(ev.target.value);
                    }}
                    value={message}
                    autoComplete={"off"}
                />
                <Button type="submit" variant="contained" disabled={!userId}>Send</Button>
            </Box>
        </Box>
    )
}

export default MessageBox;