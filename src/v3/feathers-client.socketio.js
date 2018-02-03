//* global window */
//TODO: Enable Auth
// FeathersJS 3.0+
import debug from 'debug';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
// ../examp
import socket from '../../../example/socket.js';
// Debuging the socketIO layer
socket.on('connect',()=>{
  var oldOnevent = socket.onevent;
  socket.onevent = function (packet) {
    if (packet.data) {
      debug('models/feathers/v3/feathers-client')('socket.onevent','>>>', {name: packet.data[0], payload: packet.data[1]});
    }
    oldOnevent.apply(socket, arguments);
  };

});

//import auth from '@feathersjs/authentication-client';

export const feathersClient = feathers()
  .configure(socketio(socket));
  //.configure(auth({ storage: window.localStorage }));
if (!feathersClient.io) {
  feathersClient.io = socket;
}
  
export default feathersClient;