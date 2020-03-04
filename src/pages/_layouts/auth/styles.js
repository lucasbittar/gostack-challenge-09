import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  background: #fff;
  padding: 30px 30px 55px;
  width: 100%;
  max-width: 360px;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  img {
    margin-bottom: 25px;
  }

  .input-control {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 15px;

    label {
      text-transform: uppercase;
      color: #444;
      font-weight: 700;
      margin-bottom: 8px;
    }

    input {
      padding: 0 12px;
      height: 45px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: #fff !important;

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0px 1000px white inset;
      }

      &::placeholder {
        color: #999;
      }
    }

    span {
      font-weight: 700;
      color: #ff4136;
      margin-top: 8px;
    }
  }

  button {
    background: #7d40e7;
    color: #fff;
    text-transform: uppercase;
    width: 100%;
    text-align: center;
    height: 45px;
    border: 0;
    border-radius: 4px;
    font-weight: bold;
    transition: background ease-out 300ms;

    &:hover {
      background: ${darken(0.03, '#7d40e7')};
    }
  }
`;
