import feathers from '@feathersjs/feathers';
import ioOrig from 'socket.io-client'; //'steal-ssr-socket.io';
import socketio from '@feathersjs/socketio-client';
import Zone from 'can-zone';
//import auth from '@feathersjs/authentication-client';
import loader from '@loader';

const io = Zone.ignore(ioOrig);

//'' === localhost
export const socket = io(loader.serviceBaseURL,{
  transports: ['websocket']
});

export const feathersClient = feathers()
  .configure(socketio(socket));

export default feathersClient;