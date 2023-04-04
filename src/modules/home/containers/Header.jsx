import React from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import {
  selectIsAuthenticated,
  selectOpenInfoUserTab,
  selectUser,
} from 'modules/auth/store/selector';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import TextLineThrough from 'components/TextLineThrough/index';
import Contact from 'modules/chatting/components/Contact/index';
import BaseIconBox from 'components/BaseIconBox/index';
import { selectIsActiveAddRoom } from 'modules/chatting/store/selector';
import CreateRoomChat from 'modules/chatting/components/CreateRoomChat/index';
import { setOpenInfoUserTab } from 'modules/auth/store/slice';

function Header() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isActiveAddRoom = useSelector(selectIsActiveAddRoom);
  const openInfoUserTab = useSelector(selectOpenInfoUserTab);

  const handleClickExpand = () => {
    dispatch(setOpenInfoUserTab(true));
  };

  const handleClickClose = () => {
    dispatch(setOpenInfoUserTab(false));
  };

  return (
    <div className='header'>
      <div className='header__logo'>
        <h2>D</h2>
      </div>
      <div className='header__menu'>
        <ul>
          <li>
            <Link to='/' style={{ color: 'white' }}>
              <TextLineThrough color='white'>HOME</TextLineThrough>
            </Link>
          </li>
          {/* <li>
            <TextLineThrough color='white'>PAGES</TextLineThrough>
          </li>
          <li>
            <TextLineThrough color='white'>PORTFOLIO</TextLineThrough>
          </li>
          <li>
            <TextLineThrough color='white'>BLOG</TextLineThrough>
          </li> */}
          <li>
            <Link to='/movies' style={{ color: 'white' }}>
              <TextLineThrough color='white'>MOVIES</TextLineThrough>
            </Link>
          </li>
        </ul>
      </div>
      <div className='header__others' onClick={handleClickExpand}>
        <div></div>
        <div></div>
      </div>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
        className={`header__expand ${openInfoUserTab ? 'open' : ''}`}
      >
        <BaseIconBox
          onClick={handleClickClose}
          customStyle={{
            width: '40px',
            height: '40px',
            position: 'absolute',
            top: '5px',
            right: '5px',
          }}
        >
          <CloseIcon
            sx={{
              width: 'inherit',
              height: 'inherit',
              color: '#888',
            }}
          />
        </BaseIconBox>
        {isAuthenticated ? (
          <Box className='user-profile' sx={{}}>
            <Box sx={{ marginBottom: '80px' }}>
              <h6 style={{ cursor: 'pointer' }}>Welcome</h6>
              <h4>{user.email}</h4>
            </Box>

            {isActiveAddRoom ? <CreateRoomChat /> : <Contact />}
          </Box>
        ) : (
          <div className='introduce'>
            <h4>DOAN MOVIE</h4>
            <h6>A MODERN THEME FOR THE FILM INDUSTRY & VIDEO PRODUCTION</h6>
          </div>
        )}
      </Box>
    </div>
  );
}

export default Header;
