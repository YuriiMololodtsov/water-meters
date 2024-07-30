import React from 'react';
import { observer } from 'mobx-react-lite';
import deleteIcon from '../assets/images/delete-icon.svg';
import { getIconByType, getMeterLabelByType } from '../utils/iconMapper';
import {
  TableContainer,
  TableStyled,
  DeleteButton,
  TypeContainer,
} from '../styles/TableStyles';
import store from '../models/RootStore';

const Table: React.FC = observer(() => (
  <TableContainer>
    <TableStyled>
      <thead>
        <tr>
          <th>№</th>
          <th>Тип</th>
          <th>Дата установки</th>
          <th>Автоматический</th>
          <th>Текущие показания</th>
          <th>Адрес</th>
          <th>Примечание</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {store.meters.map((meter, index) => (
          <tr key={meter.id}>
            <td>{index + 1 + store.offset}</td>
            <td>
              <TypeContainer>
                <img
                  src={getIconByType(meter._type[0])}
                  alt={meter._type[0]}
                  width={16}
                  height={16}
                />
                <span>{getMeterLabelByType(meter._type[0])}</span>
              </TypeContainer>
            </td>
            <td>
              {meter.installation_date
                ? new Date(meter.installation_date).toLocaleDateString()
                : 'N/A'}
            </td>
            <td>
              {meter.is_automatic !== null
                ? meter.is_automatic
                  ? 'Да'
                  : 'Нет'
                : 'N/A'}
            </td>
            <td>{meter.initial_values[0].toFixed(2).replace(/\.?0+$/, '')}</td>
            <td>
              {store.addresses.has(meter.area.id)
                ? `${store.addresses.get(meter.area.id)?.address}, ${
                    store.addresses.get(meter.area.id)?.number
                  }`
                : 'Loading...'}
            </td>
            <td>{meter.description}</td>
            <td>
              <DeleteButton onClick={() => store.deleteMeter(meter.id)}>
                <img
                  src={deleteIcon}
                  alt="delete"
                  width={13.33}
                  height={14.67}
                />
              </DeleteButton>
            </td>
          </tr>
        ))}
      </tbody>
    </TableStyled>
  </TableContainer>
));

export default Table;
