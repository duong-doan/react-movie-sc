import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

const Body = ({ messages }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '10px',
        flex: 1,
      }}
    >
      <Avatar
        sx={{
          width: '25px',
          height: '25px',
          margin: '0 10px',
        }}
      />
      <Box
        sx={{
          backgroundColor: grey[200],
          padding: '4px 8px',
          fontSize: '11px',
          fontWeight: '400',
        }}
      >
        <Typography>abasdjalsjd</Typography>
      </Box>
    </Box>
  );
};

export default Body;
