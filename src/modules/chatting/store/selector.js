import { createSelector } from '@reduxjs/toolkit';

const selectIdsOpenChatboxSelf = (state) => state.chatting.idsOpenChatbox;
const selectIsActiveAddRoomSelf = (state) => state.chatting.isActiveAddRoom;
const selectIsFetchingUserListSearchSelf = (state) =>
  state.chatting.isFetchingUserListSearch;
const selectUserListSearchSelf = (state) => state.chatting.userListSearch;
const selectIsFetchingUserListFriendSelf = (state) =>
  state.chatting.isFetchingUserListFriend;
const selectUserListFriendSelf = (state) => state.chatting.userListFriend;
const selectChatboxsSelf = (state) => state.chatting.chatboxs;
const selectMinimizeListSelf = (state) => state.chatting.minimizeList;

export const selectIdsOpenChatbox = createSelector(
  selectIdsOpenChatboxSelf,
  (state) => state
);

export const selectIsActiveAddRoom = createSelector(
  selectIsActiveAddRoomSelf,
  (state) => state
);

export const selectIsFetchingUserListSearch = createSelector(
  selectIsFetchingUserListSearchSelf,
  (state) => state
);

export const selectUserListSearch = createSelector(
  selectUserListSearchSelf,
  (state) => state
);

export const selectIsFetchingUserListFriend = createSelector(
  selectIsFetchingUserListFriendSelf,
  (state) => state
);

export const selectUserListFriend = createSelector(
  selectUserListFriendSelf,
  (state) => state
);

export const selectChatboxs = createSelector(
  selectChatboxsSelf,
  (state) => state
);

export const selectChatbox = (id) =>
  createSelector(selectChatboxsSelf, (state) => {
    console.log(
      'state',
      state.find((x) => x._id === id)
    );
    return state.find((x) => x._id === id);
  });

export const selectMinimizeList = createSelector(
  selectMinimizeListSelf,
  (state) => state
);
