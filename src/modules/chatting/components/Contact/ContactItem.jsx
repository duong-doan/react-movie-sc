import React from 'react';
import { Avatar, Box } from '../../../../../node_modules/@mui/material/index';

const ContactItem = ({ name, onClick }) => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        padding: '8px',
        borderRadius: '8px',
        '&:hover': {
          cursor: 'pointer',
          background: '#333',
        },
      }}
      onClick={handleClick}
    >
      <Avatar sx={{ marginRight: '20px' }} />
      <Box
        sx={{
          color: 'white',
          fontSize: '18px',
          lineHeight: '20px',
          whiteSpace: 'nowrap',
        }}
        textOverflow='ellipsis'
        overflow='hidden'
      >
        {name}
      </Box>
    </Box>
  );
};

export default ContactItem;
