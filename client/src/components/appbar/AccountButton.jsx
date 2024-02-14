import { Logout } from "@mui/icons-material";
import { Avatar, Box, IconButton, ListItemIcon, MenuItem, MenuList, Popover, Typography } from "@mui/material"
import { stringAvatar } from "../../util/Common";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";

/**
 * 
 * @param {{username: string}} props 
 * @returns 
 */
const AccountButton = ({ username }) => {
    const auth = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (ev) => {
        setAnchorEl(ev.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleLogout = () => {
        auth.logout();
        handleClose();
    }
    return (
        <Box display={'flex'} alignItems={'center'}>
            <Typography>{username}</Typography>
            <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                children={<Avatar sx={stringAvatar(username)} />}
            />
            <Popover
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClick={handleClose}
                disableRestoreFocus={true}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        }
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuList>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </MenuList>
            </Popover>
        </Box>
    )
}

export default AccountButton