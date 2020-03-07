import styled from 'styled-components';

const gutter = '15px';

export const Row = styled.div`
  display: flex;
  width: 100%;

  @media screen and (max-width: 620px) {
    flex-direction: column;
  }
`;

export const Column = styled.div`
  display: flex;
  width: ${(props) => (props.size ? `${props.size}%` : '100%')};
  margin: 0 ${gutter};

  @media screen and (max-width: 620px) {
    width: calc(100% - ${parseInt(gutter) * 2}px);
  }
`;

export const Actions = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;
`;

export const InputControl = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: ${(props) => (props.noMargin ? '0' : '15px')};
  width: ${(props) => (props.autoWidth ? 'auto' : '100%')};

  input {
    padding: 0 12px;
    height: 45px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #fff !important;
  }

  label {
    text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'none')};
    display: ${(props) => (props.hideLabel ? 'none' : 'block')};
    color: #444;
    font-weight: 700;
    margin-bottom: 8px;
  }

  @media screen and (max-width: 620px) {
    width: calc(100% - ${parseInt(gutter) * 2}px);
  }
`;
