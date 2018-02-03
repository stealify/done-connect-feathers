import loader from '@loader';
import ioClient from 'socket.io-client';
import Zone from 'can-zone';
const io = Zone.ignore(ioClient);
//import io from 'socket.io-client/dist/socket.io';
//import io from 'steal-ssr-socket.io'; //'socket.io-client';
//'' === localhost
export const socket = io(loader.serviceBaseURL,{
  transports: ['websocket']
});

export default socket;