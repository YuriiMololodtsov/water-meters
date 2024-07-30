import styled from 'styled-components';

export const TableContainer = styled.div`
  overflow-y: auto;
  margin-top: 20px;
  border-radius: 14px;
  border: 1px solid #e0e5eb;
  max-height: 800px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f8f9fa;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #5e6674;
  }
`;

export const TableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  thead {
    position: sticky;
    top: 0;
    background-color: white;
  }

  th,
  td {
    border-bottom: 1px solid #ddd;
    padding: 8px;

    border-left: none;
    border-right: none;
  }

  tr:hover {
    cursor: pointer;
    background-color: #f7f8f9;
  }

  th {
    padding-bottom: 12px;
    text-align: left;
    background-color: #f0f3f7;
    color: #697180;
    font-size: 13px;
    font-weight: 500;
  }
`;

export const DeleteButton = styled.button`
  background-color: #fee3e3;
  cursor: pointer;
  border: none;
  padding: 10px 12px;
  border-radius: 8px;
  min-width: 40px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #fed7d7;
  }
`;

export const TypeContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-right: 8px;
  }
`;
