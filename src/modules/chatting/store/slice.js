import { createSlice } from '@reduxjs/toolkit';
// import uniq from 'lodash/uniq';
// import map from 'lodash/map';

const initialState = {
  list: {},
  ids: [],
  idsOpenChatbox: [],
  isFetchingUserListSearch: false,
  userListSearch: [],
  isActiveAddRoom: false,
  isFetchingUserListFriend: false,
  userListFriend: [],
  chatboxs: [],
  minimizeList: [],
};

export const chattingSlice = createSlice({
  name: 'chatting',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    listMessage: (state, action) => {
      state.list = action.payload;
    },
    setIdsOpenChatbox: (state, action) => {
      state.idsOpenChatbox = action.payload;
    },
    setUserListSearch: (state, action) => {
      state.userListSearch = action.payload;
    },
    setIsActiveAddRoom: (state, action) => {
      state.isActiveAddRoom = action.payload;
    },
    updateIsFetchingUserListSearch: (state, action) => {
      state.isFetchingUserListSearch = action.payload;
    },
    searchUsersRequest: (state, action) => {
      state.isFetchingUserListSearch = true;
    },
    searchUsersSuccess: (state, action) => {
      state.userListSearch = action.payload;
      state.isFetchingUserListSearch = false;
    },
    searchUsersFailed: (state) => {
      state.isFetchingUserListSearch = false;
    },
    updateIsFetchingUserListFriend: (state, action) => {
      state.isFetchingUserListFriend = action.payload;
    },
    getUserListFriendRequest: (state, action) => {
      state.isFetchingUserListFriend = true;
    },
    getUserListFriendSuccess: (state, action) => {
      state.userListFriend = [...state.userListFriend, ...action.payload];
      state.isFetchingUserListFriend = false;
    },
    getUserListFriendFailed: (state, action) => {
      state.isFetchingUserListFriend = false;
    },
    createRoomChatRequest: (state, action) => {
      return state;
    },
    addChatBox: (state, action) => {
      state.chatboxs = [...state.chatboxs, action.payload];
    },
    setChatBoxs: (state, action) => {
      state.chatboxs = action.payload;
    },
    addMinimizeList: (state, action) => {
      state.chatboxs = [...state.minimizeList, action.payload];
    },
    setMinimizeList: (state, action) => {
      state.minimizeList = action.payload;
    },
  },
});

export const {
  listMessage,
  setIdsOpenChatbox,
  setUserListSearch,
  setIsActiveAddRoom,
  updateIsFetchingUserListSearch,
  searchUsersRequest,
  searchUsersSuccess,
  searchUsersFailed,
  updateIsFetchingUserListFriend,
  getUserListFriendRequest,
  getUserListFriendSuccess,
  getUserListFriendFailed,
  createRoomChatRequest,
  addChatBox,
  setChatBoxs,
  addMinimizeList,
  setMinimizeList,
} = chattingSlice.actions;

export default chattingSlice.reducer;
