import React from 'react';
import { Box } from '../../../node_modules/@mui/material/index';
import { grey } from '@mui/material/colors';

const BaseIconBox = ({ children, onClick, customStyle }) => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '25px',
        height: '25px',
        padding: '2px',
        cursor: 'pointer',
        marginLeft: '4px',
        '&:hover > svg': {
          color: grey[800],
        },
        ...customStyle,
      }}
      onClick={handleClick}
    >
      {children}
    </Box>
  );
};

export default BaseIconBox;
