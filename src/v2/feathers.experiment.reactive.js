// models/feathers.js 2.3 syntax
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import io from 'steal-ssr-socket.io';
import hooks from 'feathers-hooks';
import auth from 'feathers-authentication-client';
import rxjs from 'rxjs';
import rx from 'feathers-reactive';

const host = 'http://master.peep:3030';
const socket = io(host, {
  transports: ['websocket'],
  forceReconnect: true
});

const feathersClient = feathers()
    // Use the feathers-reactive plugin for live-updating lists!
  .configure(rx(rxjs, {
    idField: '_id'
  }))
  .configure(hooks())
  .configure(socketio(socket))
  .configure(auth());

export default feathersClient;
