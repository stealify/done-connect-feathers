//import feathersClient from './feathers-client.rest.js';
import socket from '../socket.js';

export default function connect(Map) {
  // Only do that if not running in node!
  socket.on(Map.name+' created', message => Map.connection.createInstance(message));
  socket.on(Map.name+' updated', message => Map.connection.updateInstance(message));
  socket.on(Map.name+' patched', message => Map.connection.updateInstance(message));
  socket.on(Map.name+' removed', message => Map.connection.destroyInstance(message));

  
  //feathersClient.io.on(serviceIdentifyer+' updated', data => Map.connection.updateInstance(artist))
  // This is possible even if your primary connection method is REST.
  /*
    feathersClient.io.on(serviceIdentifyer+' created', data => Map.connection.createInstance(artist));
    feathersClient.io.on(serviceIdentifyer+' updated', data => Map.connection.updateInstance(artist));
    feathersClient.io.on(serviceIdentifyer+' patched', data => Map.connection.updateInstance(artist));
    feathersClient.io.on(serviceIdentifyer+' removed', data => Map.connection.destroyInstance(artist));
    */
}

  
  