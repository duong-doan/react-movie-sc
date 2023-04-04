import React, { useState } from 'react';
import { Box, InputBase, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import CollectionsIcon from '@mui/icons-material/Collections';
import SendIcon from '@mui/icons-material/Send';

import useSocket from 'utils/socket';
import { useSelector } from 'react-redux';
import { selectUser } from 'modules/auth/store/selector';

const Tools = ({ onSendMessage }) => {
  const [msg, setMsg] = useState('');
  const { emitEvent } = useSocket();
  // const user = useSelector(selectUser);

  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(msg);
    emitEvent('chatting', msg);
    setMsg('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
      }}
    >
      <Box
        sx={{
          width: '25px',
          height: '25px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CollectionsIcon
          color='disabled'
          sx={{
            '&:hover': {
              color: grey[800],
              cursor: 'pointer',
            },
          }}
        />
      </Box>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        <InputBase
          value={msg}
          sx={{
            backgroundColor: grey[200],
            borderRadius: '20px',
            paddingLeft: '15px',
            fontSize: '15px',
            flex: 1,
            margin: '0 10px',
          }}
          onChange={handleChange}
        />
        <Button
          size='small'
          type='submit'
          sx={{
            width: '25px',
            minWidth: '25px',
            height: '25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
        >
          <SendIcon
            color='disabled'
            sx={{
              '&:hover': {
                color: grey[800],
                cursor: 'pointer',
              },
            }}
            onClick={handleSubmit}
          />
        </Button>
      </form>
    </Box>
  );
};

export default Tools;
