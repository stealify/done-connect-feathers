import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import auth from 'feathers-authentication-client';
import hooks from 'feathers-hooks';

//import io from 'steal-ssr-socket.io';

import io from 'socket.io-client/dist/socket.io';

const socket = io('http://master.peep:3030', {
  transports: ['websocket']
});


const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(hooks())
  .configure(auth({
    storage: window.localStorage
  }));
//console.log(feathersClient)
//process.exit(1)
export default feathersClient;