import { useContext, useEffect, useState } from "react";
import { AuthContext } from "src/context/auth";

const { Card, Typography, Avatar, CardContent, Stack, CardActionArea } = require("@mui/material");

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    //   children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const ContactCard = ({userId, callback}) => {
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState('');
  useEffect(() => {
    const fetchUsername = async function () {
      let arg = await auth.getUsernameById(userId);
      setUsername(arg);
    }
    fetchUsername();
  }, [])
  return (
    <Card onClick={() => {
        callback(userId);
    }}>
      <CardActionArea>
        <Stack flexDirection={"row"} alignItems={'center'} gap={1} margin={1}>
          <Avatar {...stringAvatar(username)} />
          <Typography marginRight={1}>{username}</Typography>
        </Stack>
      </CardActionArea>
    </Card>
  );
}

export default ContactCard;