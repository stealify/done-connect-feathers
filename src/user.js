import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/list';
import connect from 'can-connect';
import feathersClient from './feathers-client';
import feathersServiceBehavior from '~/models/feathers/v2/service';
import behaviors from './behaviors';
import algebra from './algebra';

var User = DefineMap.extend('User', {
  _id: 'any',
  email: 'string',
  password: 'string'
});

User.List = DefineList.extend({
  '#': User
});

User.connection = connect([
  feathersServiceBehavior,
  ...behaviors
], {
  Map: User,
  List: User.List,
  feathersService: feathersClient.service('http://master.peep:3030/users'),
  name: 'users',
  algebra
});

User.algebra = algebra;

export default User;
