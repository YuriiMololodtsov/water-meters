import { types } from 'mobx-state-tree';

const MeterModel = types.model('MeterModel', {
  id: types.identifier,
  _type: types.array(types.string),
  area: types.model({
    id: types.string,
  }),
  is_automatic: types.maybe(types.boolean),
  communication: types.string,
  description: types.maybeNull(types.string),
  serial_number: types.string,
  installation_date: types.maybe(types.string),
  initial_values: types.array(types.number),
});

export default MeterModel;
