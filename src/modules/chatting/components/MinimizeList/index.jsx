import React from 'react';
import { Box } from '@mui/material';
import BaseIconBox from 'components/BaseIconBox/index';
import { Avatar } from '../../../../../node_modules/@mui/material/index';
import { useSelector } from 'react-redux';
import { selectMinimizeList } from 'modules/chatting/store/selector';

const MinimizeList = () => {
  const minimizeList = useSelector(selectMinimizeList);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        bottom: '90px',
        right: '30px',
        zIndex: 2,
      }}
    >
      {minimizeList.map((item) => (
        <BaseIconBox
          customStyle={{
            width: '50px',
            height: '50px',
            marginLeft: '0 ',
            marginTop: '10px',
          }}
        >
          <Avatar
            sx={{
              width: 'inherit',
              height: 'inherit',
            }}
            alt='Remy Sharp'
          />
        </BaseIconBox>
      ))}
    </Box>
  );
};

export default MinimizeList;
