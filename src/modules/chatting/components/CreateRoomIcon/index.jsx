import React from 'react';
import { Box } from '@mui/material';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';

const CreateRoomIcon = ({ onClickCreateChat }) => {
  return (
    <Box
      sx={{
        width: '50px',
        height: '50px',
        backgroundColor: 'white',
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 100,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        filter: 'drop-shadow(rgba(255, 255, 255, 0.8) 0px 0px 20px)',
        '&:hover': {
          cursor: 'pointer',
        },
      }}
      onClick={onClickCreateChat}
    >
      <MapsUgcIcon />
    </Box>
  );
};

export default CreateRoomIcon;
