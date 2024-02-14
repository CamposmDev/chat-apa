import { AttachFile, Send } from "@mui/icons-material";
import { Box, Button, TextField, Tooltip } from "@mui/material";
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
        <Box component={'form'} onSubmit={sendMessage}>
            <Box display={'flex'} sx={{ padding: 2 }}>
                <TextField label={'Message'}
                    fullWidth
                    name="message"
                    size="small"
                    disabled={!Boolean(userId)}
                    onChange={(ev) => {
                        setMessage(ev.target.value);
                    }}
                    value={message}
                    autoComplete={"off"}
                />
                <Tooltip title='Attach File'>
                    <Button disabled variant="contained" component="label"><AttachFile /><input type='file' hidden /></Button>
                </Tooltip>
                <Tooltip title='Send Message'>
                    <Button type="submit" variant="contained" disabled={!userId}><Send /></Button>
                </Tooltip>
            </Box>
        </Box>
    )
}

export default MessageBox;