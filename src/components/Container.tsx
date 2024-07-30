import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import store from '../models/RootStore';
import Table from './Table';
import Pagination from './Pagination';
import Header from './Header';
import { ContainerStyled } from '../styles/ContainerStyles';

const Container: React.FC = observer(() => {
  useEffect(() => {
    store.fetchMeters();
  }, [store.offset]);

  return (
    <ContainerStyled>
      <Header />
      <Table />
      <Pagination />
    </ContainerStyled>
  );
});

export default Container;
