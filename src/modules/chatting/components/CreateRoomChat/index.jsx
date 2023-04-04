import React, { useEffect, useState } from 'react';
import {
  Box,
  Input,
  TextField,
} from '../../../../../node_modules/@mui/material/index';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContactItem from '../Contact/ContactItem';
import useDebounce from 'utils/hooks/useDebounce';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'components/Spinner/index';
import {
  searchUsersRequest,
  setIsActiveAddRoom,
  setUserListSearch,
} from 'modules/chatting/store/slice';
import {
  selectIsFetchingUserListSearch,
  selectUserListSearch,
} from 'modules/chatting/store/selector';
import BaseIconBox from 'components/BaseIconBox/index';

const CreateRoomChat = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const debounceSearch = useDebounce(search, 1000);
  const isFetchingUserListSearch = useSelector(selectIsFetchingUserListSearch);
  const userListSearch = useSelector(selectUserListSearch);

  const isUserNotFound = !userListSearch.length && !!debounceSearch;

  useEffect(() => {
    return () => {
      dispatch(setUserListSearch([]));
      setSearch('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!debounceSearch) {
      dispatch(setUserListSearch([]));
      return;
    }

    dispatch(searchUsersRequest(debounceSearch));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleBack = () => {
    dispatch(setIsActiveAddRoom(false));
  };

  const handleClickContactItem = (id) => {
    const roomId = `room_${id}`;
    console.log('id', roomId);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '18px 0',
        color: 'white',
      }}
    >
      <Box
        sx={{
          marginBottom: '20px',
          margin: '0 20px 16px 20px',
          position: 'relative',
        }}
      >
        <BaseIconBox
          customStyle={{
            position: 'absolute',
            width: '14px',
            height: '14px',
          }}
          onClick={handleBack}
        >
          <ArrowBackIcon />
        </BaseIconBox>
        <Box
          sx={{
            fontSize: '18px',
          }}
        >
          New message
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '18px',
          padding: '0 20px 20px 20px',
        }}
      >
        <Box sx={{ marginRight: '10px' }}>To:</Box>
        <TextField
          variant='standard'
          sx={{
            flex: 1,
            color: 'white',
            borderColor: 'white !important',
            background: '#999',
            padding: 0,
            '& input': {
              paddingLeft: '5px',
            },
          }}
          onChange={handleChange}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          height: 'calc(100vh - 300px)',
          overflow: 'auto',
        }}
      >
        {isFetchingUserListSearch ? (
          <Spinner
            customStyle={{
              width: '20px',
              height: '20px',
              right: '40px',
              left: '50%',
              top: '30%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
            }}
          />
        ) : isUserNotFound ? (
          'User not found'
        ) : (
          userListSearch.map((user) => (
            <ContactItem
              onClick={() => handleClickContactItem(user._id)}
              name={user.email}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default CreateRoomChat;
