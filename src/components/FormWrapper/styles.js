import styled from 'styled-components';

const gutter = '15px';

export const Container = styled.div`
  background: #fff;
  margin-top: 30px;
  border-radius: 4px;
  padding: ${parseInt(gutter) * 2}px ${gutter};

  form {
    width: 100%;
  }

  label {
    text-transform: none !important;
  }

  .row {
    display: flex;
    width: 100%;
  }

  .col-full {
    width: 100%;
    margin: 0 ${gutter};
  }

  .col-half {
    width: 50%;
    margin: 0 ${gutter};
  }
`;
