/* global window */
//TODO: Enable Auth
import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import loader from '@loader';
//import auth from '@feathersjs/authentication-client';

const restClient = rest(loader.serviceBaseURL);

export let feathersClient = feathers()
if (window && window.fetch){
  feathersClient.configure(restClient.fetch(window.fetch));
} else {
  feathersClient = loader.import('jquery')
    .then(($)=>feathersClient.configure(restClient.jquery($)))
    .then(()=>feathersClient);
}  


  /*
  .configure(auth({
    storage: window.localStorage
  }));
  */
  
export default feathersClient;