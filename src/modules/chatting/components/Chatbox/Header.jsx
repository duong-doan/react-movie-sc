import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CloseIcon from '@mui/icons-material/Close';
import BaseIconBox from 'components/BaseIconBox/index';

const Header = ({ name, onClickMinimize }) => {
  const handleClickMinimize = () => {
    onClickMinimize?.();
  };

  return (
    <Box
      sx={{
        width: 'inherit',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px',
      }}
    >
      {/* user name */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Avatar
          sx={{
            width: '32px',
            height: '32px',
            marginRight: '8px',
          }}
          alt='Remy Sharp'
          src='/static/images/avatar/1.jpg'
        />
        <Typography>{name}</Typography>
      </Box>

      {/* actions */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginRight: '10px',
        }}
      >
        <BaseIconBox>
          <CallIcon color='disabled' />
        </BaseIconBox>
        <BaseIconBox>
          <VoiceChatIcon color='disabled' />
        </BaseIconBox>
        <BaseIconBox>
          <MinimizeIcon color='disabled' onClick={handleClickMinimize} />
        </BaseIconBox>
        <BaseIconBox>
          <CloseIcon color='disabled' />
        </BaseIconBox>
      </Box>
    </Box>
  );
};

export default Header;
