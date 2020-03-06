import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  .Toastify__toast {
    border-radius: 4px;
    padding: 10px 20px;
    font: 14px 'Roboto', sans-serif;
    font-weight: bold;
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
`;
