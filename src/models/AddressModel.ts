import { types } from 'mobx-state-tree';

const AddressModel = types.model('AddressModel', {
  id: types.identifier,
  address: types.string,
  number: types.string,
});

export default AddressModel;
