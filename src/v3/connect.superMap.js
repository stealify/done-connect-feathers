//import feathersClient from './feathers-client.rest.js';
import route from 'can-route';
//import behaviors from './behaviors';
import superMap from 'can-connect/can/super-map/';
//import socket from '../socket.js';

import debug from 'debug';
import tag from 'can-connect/can/tag/';

export default function connect(Map,serviceIdentifyer,tagName) {
  let serviceName = serviceIdentifyer;
  if (!serviceName) {
    throw new Error('Missing: serviceName call it (map,\'Identifyer\',\'tag\')');
  } else if (serviceName.indexOf('/')) {
    serviceName = serviceName.replace(/\//g,'-');
  }
  debug('models/feathers/v3/connect.superMap')(serviceName);
  
  debug('models/feathers/v3/connect.superMap')(Map,serviceIdentifyer, tagName);




  Map.connection = superMap({
  // * e.g. `url: feathersClient.rest('messages'),`
    url: 'http://'+route.data.baseUrl + '/'+serviceIdentifyer,
    Map: Map,
    List: Map.List,
    name: 'artist',
    algebra: Map.algebra
  });

  // Only do that if not running in node!
  /*
socket.on('artists created', artist => Artist.connection.createInstance(artist));
socket.on('artists updated', artist => Artist.connection.updateInstance(artist));
socket.on('artists patched', artist => Artist.connection.updateInstance(artist));
socket.on('artists removed', artist => Artist.connection.destroyInstance(artist));
*/
   
  //feathersClient.io.on(serviceIdentifyer+' updated', data => Map.connection.updateInstance(artist))
  // This is possible even if your primary connection method is REST.
  /*
    feathersClient.io.on(serviceIdentifyer+' created', data => Map.connection.createInstance(artist));
    feathersClient.io.on(serviceIdentifyer+' updated', data => Map.connection.updateInstance(artist));
    feathersClient.io.on(serviceIdentifyer+' patched', data => Map.connection.updateInstance(artist));
    feathersClient.io.on(serviceIdentifyer+' removed', data => Map.connection.destroyInstance(artist));
    */  
  
  tag(tagName, Map.connection);
}

  
  