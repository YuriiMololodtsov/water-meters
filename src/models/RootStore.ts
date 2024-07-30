import {
  types,
  flow,
  applySnapshot,
  getParent,
  destroy,
} from 'mobx-state-tree';
import axios from 'axios';
import MeterModel from './MeterModel';
import AddressModel from './AddressModel';

const isValidObjectId = (id: string) => /^[a-f\d]{24}$/i.test(id);

const RootStore = types
  .model('RootStore', {
    meters: types.array(MeterModel),
    addresses: types.map(AddressModel),
    offset: types.number,
    limit: types.number,
    totalCount: types.maybe(types.number),
  })
  .actions((self) => {
    const fetchAddresses = flow(function* (ids: string[]) {
      try {
        const uniqueValidIds = Array.from(new Set(ids)).filter(isValidObjectId);
        if (uniqueValidIds.length === 0) return;

        const params = new URLSearchParams();
        uniqueValidIds.forEach((id) => params.append('id__in', id));

        const response = yield axios.get(
          'http://showroom.eis24.me/api/v4/test/areas/',
          { params }
        );

        response.data.results.forEach((address: any) => {
          self.addresses.set(address.id, {
            id: address.id,
            address: address.house.address,
            number: address.str_number_full,
          });
        });
      } catch (error) {
        console.error('Failed to fetch addresses:', error);
      }
    });

    const fetchMeters = flow(function* () {
      try {
        const response = yield axios.get(
          'http://showroom.eis24.me/api/v4/test/meters/',
          {
            params: { limit: self.limit, offset: self.offset },
          }
        );

        self.totalCount = response.data.count ?? 0;

        const meters = response.data.results.map((meter: any) => ({
          ...meter,
          is_automatic:
            meter.is_automatic === null ? undefined : meter.is_automatic,
        }));
        applySnapshot(self.meters, meters);

        const areaIds = meters
          .map((meter: any) => meter.area.id.trim())
          .filter((id: string) => !self.addresses.has(id));
        if (areaIds.length) {
          yield fetchAddresses(areaIds);
        }
      } catch (error) {
        console.error('Failed to fetch meters:', error);
      }
    });

    const deleteMeter = flow(function* (meterId: string) {
      try {
        const response = yield axios.delete(
          `http://showroom.eis24.me/api/v4/test/meters/${meterId}/`
        );
        if (response.status === 204) {
          const meter = self.meters.find((meter) => meter.id === meterId);
          if (meter) {
            destroy(meter);
          }
          if (self.meters.length < self.limit) {
            yield fetchMeters();
          }
        } else {
          console.error(
            `Failed to delete meter: received status ${response.status}`
          );
        }
      } catch (error) {
        console.error('Failed to delete meter:', error);
      }
    });

    const setOffset = (newOffset: number) => {
      self.offset = newOffset;
    };

    return {
      fetchMeters,
      fetchAddresses,
      deleteMeter,
      setOffset,
    };
  });

const store = RootStore.create({
  meters: [],
  addresses: {},
  offset: 0,
  limit: 20,
  totalCount: 0,
});

export default store;
