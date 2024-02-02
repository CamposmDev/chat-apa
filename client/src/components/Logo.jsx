import { Icon, Stack, Typography } from "@mui/material"
import { Message } from "@mui/icons-material"

const Logo = () => {
    return (
        <Stack direction={'row'} alignItems={'center'} sx={{ mt: 1 }}>
            <Icon sx={{ mr: 1 }} color="primary">
                <Message />
            </Icon>
            <Typography color={'primary'} variant="h6"><b>Chat App</b></Typography>
        </Stack>
    )
}

export default Logo