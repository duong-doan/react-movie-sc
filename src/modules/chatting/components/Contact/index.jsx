import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ContactItem from './ContactItem';
import BaseIconBox from 'components/BaseIconBox/index';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import {
  createRoomChatRequest,
  getUserListFriendRequest,
  setIsActiveAddRoom,
  setIdsOpenChatbox,
  setMinimizeList,
  addChatBox,
} from 'modules/chatting/store/slice';
import {
  selectIsFetchingUserListFriend,
  selectIdsOpenChatbox,
  selectUserListFriend,
  selectMinimizeList,
} from 'modules/chatting/store/selector';
import Spinner from 'components/Spinner/index';
import InfiniteScroll from 'react-infinite-scroll-component';
import { selectUser } from 'modules/auth/store/selector';

const Contact = () => {
  const dispatch = useDispatch();
  const isFetchingUserListFriend = useSelector(selectIsFetchingUserListFriend);
  const userListFriend = useSelector(selectUserListFriend);
  const userInfo = useSelector(selectUser);
  const idsOpenChatbox = useSelector(selectIdsOpenChatbox);
  const minimizeList = useSelector(selectMinimizeList);

  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getUserListFriendRequest(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleClickLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleClickAdd = () => {
    dispatch(setIsActiveAddRoom(true));
  };

  const handleClickContactItem = (item) => {
    const roomId = `room_${item._id}`;
    const name = item.name || item.email.split('@')[0];
    const payload = {
      roomId,
      userId: userInfo.id,
      name,
    };
    const _idsOpenChatbox = [...idsOpenChatbox, item._id];
    const _minimizeList = [...minimizeList, item];

    if (_idsOpenChatbox.length > 3) {
      dispatch(setMinimizeList(_minimizeList));
      return;
    }

    dispatch(addChatBox(item));
    dispatch(createRoomChatRequest(payload));
    dispatch(setIdsOpenChatbox(_idsOpenChatbox));
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          marginBottom: '20px',
        }}
      >
        <h6>Chat</h6>
        <BaseIconBox
          customStyle={{
            width: '30px',
            height: '30px',
          }}
          onClick={handleClickAdd}
        >
          <AddIcon
            sx={{ width: 'inherit', height: 'inherit', color: '#888' }}
          />
        </BaseIconBox>
      </Box>

      <InfiniteScroll
        height='calc(100vh - 350px)'
        style={{
          overflow: 'auto',
          justifyContent: 'flex-start',
          position: 'relative',
        }}
        dataLength={userListFriend.length}
        hasMore={true}
        next={handleClickLoadMore}
        loader={
          isFetchingUserListFriend && (
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
          )
        }
      >
        {userListFriend.map((x) => {
          return (
            <ContactItem
              key={x._id}
              name={x.email}
              onClick={() => handleClickContactItem(x)}
            />
          );
        })}
      </InfiniteScroll>
    </Box>
  );
};

export default Contact;
