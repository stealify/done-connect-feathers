//* global window */
//TODO: Enable Auth
// FeathersJS 3.0+

import feathers from '@feathersjs/feathers';
import loader from '@loader';

import Primus from '@feathersjs/primus-client';
export const socketPrimus = new Primus(loader.serviceBaseURL);

//import auth from '@feathersjs/authentication-client';

export const feathersClient = feathers()
  .configure(Primus(socketPrimus))
  /*
  .configure(auth({
    storage: window.localStorage
  }));
  */
  
export default feathersClient;