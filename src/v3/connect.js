import behaviorsrest from '~/models/feathers/behaviors-rest';
import behaviorsrealtime from '~/models/feathers/behaviors';
import feathersServiceBehavior from '~/models/feathers/behavior-feathers';
import feathersClient from './feathers-client';
const behaviors = [ 
  feathersServiceBehavior, // v2.x Realtime
  ...behaviorsrest,
  ...behaviorsrealtime
];
//import feathersClient from './feathers-client.js';
import debug from 'debug';
import tag from 'can-connect/can/tag/';
import canConnect from 'can-connect';

// Should check plattform and apply the right connection that would be the
// best solution because then we can leave out even socket-commons
export default function connect(Map,serviceIdentifyer,tagName) {
  if (!Map.name && serviceIdentifyer) {
    Map.name = serviceIdentifyer;
  }
  /*
  if (!tagName) {
    throw new Error('Missing: tagName call it (map,\'Identifyer\',\'tag\')');
  } else if (tagName.indexOf('/')) {
    // Normalize Service names with / to - not needed
    tagName = tagName.replace(/\//g,'-');
  }
  */
  debug('models/feathers/v3/connect')(Map,serviceIdentifyer, tagName);
  /*
  * If your Map needs to be queried during server side rendering,
  * then you'll want to use REST as your transport method.
  *
  * e.g. `url: feathersClient.rest('messages'),`
  */              
  // url: feathersClient.socketio('messages'), // v3.x Connection.
  const List = Map.List, name = Map.name, algebra = Map.algebra;
  const feathersService = feathersClient.then((con)=>{
    if (!con) {
      throw new Error(Map.name);
    }
    return con.service(Map.name);
  },(err)=>{
    new Error('Feathers-client Error '+ Map.name,err);
  });

  Map.connection = canConnect(behaviors, {
    Map, List, idProp: '_id', feathersService, name, algebra
  });

  if (tagName) {
    tag(tagName, Map.connection);
  }
  
}

  
  