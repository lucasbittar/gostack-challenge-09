import styled from 'styled-components';

export const SelectWrapper = styled.div`
  width: 100%;
  position: relative;

  svg {
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -13px;
  }

  select {
    display: block;
    width: 100%;
    -webkit-appearance: none;
    padding: 0 12px;
    height: 45px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #fff;
    color: #999;

    &.active {
      color: #000;
    }
  }
`;