import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 20px;
`;

export const PageButton = styled.button<{ isActive: boolean }>`
  margin: 0 5px;
  padding: 8px 12px;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? '#F2F5F8' : 'white')};
  color: #1f2939;
  border: 1px solid #ced5de;
  border-radius: 6px;
`;
