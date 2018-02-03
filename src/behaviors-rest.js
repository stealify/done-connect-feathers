import dataParse from 'can-connect/data/parse/parse';
import construct from 'can-connect/constructor/constructor';
import constructStore from 'can-connect/constructor/store/store';
import constructCallbacksOnce from 'can-connect/constructor/callbacks-once/callbacks-once';
import canMap from 'can-connect/can/map/map';
import canRef from 'can-connect/can/ref/ref';

const behaviors = [
  dataParse,
  construct,
  constructStore,
  constructCallbacksOnce,
  canMap,
  canRef
];

export default behaviors;
