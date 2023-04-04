import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Body from './Body';
import Tools from './Tools';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectChatbox,
  selectChatboxs,
  selectIdsOpenChatbox,
} from 'modules/chatting/store/selector';
import {
  addMinimizeList,
  setChatBoxs,
  setIdsOpenChatbox,
} from 'modules/chatting/store/slice';

const Chatbox = ({ id, index }) => {
  const dispatch = useDispatch();
  const CHATBOX_WIDTH = 328;
  const chatbox = useSelector(selectChatbox(id));
  const chatboxs = useSelector(selectChatboxs);
  const idsOpenChatbox = useSelector(selectIdsOpenChatbox);
  console.log('chatbox', chatbox);

  const handleSendMessage = (msg) => {
    console.log(msg);
  };

  const handleClickMinimize = () => {
    const _deleteChatboxs = chatboxs.filter((x) => x._id !== id);
    const _deleteIdsOpenChatbox = idsOpenChatbox.filter((x) => x !== id);
    dispatch(setChatBoxs(_deleteChatboxs));
    dispatch(setIdsOpenChatbox(_deleteIdsOpenChatbox));
    dispatch(addMinimizeList(chatbox));
  };

  return (
    <Box
      sx={{
        width: `${CHATBOX_WIDTH}px`,
        height: '455px',
        backgroundColor: 'white',
        position: 'fixed',
        bottom: '0',
        right: `${index > 0 ? 90 + CHATBOX_WIDTH * index + 10 * index : 90}px`,
        zIndex: 100,
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Header
        name={chatbox?.name || ''}
        onClickMinimize={handleClickMinimize}
      />
      <Body messages={[]} />
      <Tools onSendMessage={handleSendMessage} />
    </Box>
  );
};

export default Chatbox;
