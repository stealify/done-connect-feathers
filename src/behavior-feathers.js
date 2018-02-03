var connect = require('can-connect');

function getIdProp (Model) {
  var algebraIdProp;
  var algebraClause = Model.algebra && Model.algebra.clauses && Model.algebra.clauses.id;
  if (algebraClause) {
    algebraIdProp = Object.keys(algebraClause)[0];
  }
  if (!algebraIdProp && !Model.idProp) {
    throw new Error('An idProp was not set in the Model for ' + Model + '. Things may not work as expected.');
  }
  return algebraIdProp || Model.idProp;
}

module.exports = connect.behavior('data/feathers-service', function () {
  var helpURL = 'https://canjs.com/doc/can-connect-feathers.html';
  if (!this.feathersService) {
    /*
    if (this.feathersClient && this.feathersServiceName) {
      let feathersClient = this.feathersClient;
      let feathersServiceName = this.feathersServiceName;
      
      feathersClient.then((feathersClient)=>{
        this.feathersService = feathersClient.service(feathersServiceName);
      },(err)=>{
        new Error('Feathers-client Error '+ feathersServiceName,err);
      }); 
    
    } else {
    */
      throw new Error('You must provide a feathersService to the feathers-service behavior: ' + helpURL);
    //}
   
  }
  // Async behavior ;)
  var service = Promise.resolve(this.feathersService);

  return {
    init: function () {
      var self = this;
      // Connect to real-time events.
      service.then(instance=>{
        instance.on('created', function (message) { self.createInstance(message); });
        instance.on('updated', function (message) { self.updateInstance(message); });
        instance.on('patched', function (message) { self.updateInstance(message); });
        instance.on('removed', function (message) { self.destroyInstance(message); });
      },(err)=>{
        console.log(err)
      });
    },

    getListData: function (params) {
      return service.then(instance=>instance.find({query: params}));
    },

    getData: function (params) {
      var id = null;
      var idProp = getIdProp(this);
      if (typeof params === 'string' || typeof params === 'number') {
        id = params;
        params = {};
      } else if (params && typeof params[idProp] !== 'undefined') {
        id = params[idProp];
        delete params[idProp];
      }
      return service.then(instance=>instance.get(id, params));
    },

    createData: function (data) {
      return service.then(instance=>instance.create(data));
    },

    updateData: function (mapInstance) {
      var idProp = getIdProp(this);
      return service.then(instance=>instance.update(mapInstance[idProp], mapInstance));
    },

    destroyData: function (mapInstance) {
      var idProp = getIdProp(this);
      return service.then(instance=>instance.remove(mapInstance[idProp]));
    }
  };
});