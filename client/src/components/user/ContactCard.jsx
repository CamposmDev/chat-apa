import { Card, ListItemButton } from "@mui/material";
import CredentialBox from "./CredentialBox";

/**
 * 
 * @param {{userId: string, callback?: Function, isSelected?: boolean, online?: boolean}} props 
 * @returns 
 */
const ContactCard = ({ userId, callback, isSelected, online }) => {
  const handleClick = () => callback(userId);
  return (
    <Card sx={{ mb: 1 }}>
      <ListItemButton sx={{ pl: 1 }}
        onClick={handleClick}
        selected={isSelected}
        dense
        disableGutters

      >
        <CredentialBox userId={userId} online={online}></CredentialBox>
      </ListItemButton>
    </Card>
  );
}

export default ContactCard;