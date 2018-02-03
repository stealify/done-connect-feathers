/* global window */
import loader from '@loader';

let clientUrl;

if (window && window.fetch) {
  clientUrl = '~/models/feathers/v3/feathers-client.socketio.js';
} else {
  clientUrl = '~/models/feathers/v3/feathers-client.rest.js';
} 

export const feathersClient = loader.import(clientUrl).then((module)=>{ return module.feathersClient; }, err=>{
  new Error('Feathers-client Error '+ clientUrl,err);
}); 


export default feathersClient;