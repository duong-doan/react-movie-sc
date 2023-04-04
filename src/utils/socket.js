import { io } from 'socket.io-client';

const UseSocket = () => {
  const socket = io(process.env.REACT_APP_SERVER_LOCAL);

  socket.on('connect', () => {
    // console.log('socket.id', socket.id);
  });

  const emitEvent = (channel, data) => {
    socket.emit(channel, data);
  };

  const onEvent = (channel, data) => {
    socket.on(channel, data);
  };

  return {
    emitEvent,
    onEvent,
  };
};

export default UseSocket;
