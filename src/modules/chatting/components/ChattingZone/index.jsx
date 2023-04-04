import React from 'react';
import MinimizeList from '../MinimizeList/index';
import CreateRoomIcon from '../CreateRoomIcon/index';
import { useDispatch, useSelector } from 'react-redux';
import { selectOpenInfoUserTab } from 'modules/auth/store/selector';
import { setOpenInfoUserTab } from 'modules/auth/store/slice';
import { selectIdsOpenChatbox } from 'modules/chatting/store/selector';
import Chatbox from '../Chatbox/index';

const ChattingZone = () => {
  const dispatch = useDispatch();
  const idsOpenChatbox = useSelector(selectIdsOpenChatbox);
  const openInfoUserTab = useSelector(selectOpenInfoUserTab);

  const handleClickChat = () => {
    dispatch(setOpenInfoUserTab(!openInfoUserTab));
  };

  return (
    <>
      {idsOpenChatbox.map((item, index) => (
        <Chatbox key={item} index={index} id={item} />
      ))}
      <MinimizeList />
      <CreateRoomIcon onClickCreateChat={handleClickChat} />
    </>
  );
};

export default ChattingZone;
