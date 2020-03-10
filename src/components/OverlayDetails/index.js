import styled from 'styled-components';
import { transparentize } from 'polished';

const OverlayDetails = styled.div`
  > strong {
    font-size: 14px;
    color: #444;
    margin-bottom: 12px;
    display: block;
  }

  h3 {
    margin-bottom: 10px;
    text-transform: uppercase;
    color: #444;
    font-size: 14px;
  }

  h4 {
    margin-bottom: 12px;
    color: #de3b3b;
    span {
      display: inline-block;
      padding: 2px 4px;
      background: ${transparentize(0.9, '#de3b3b')};
    }
  }

  p {
    font-size: 16px;
    color: #666;
    margin-bottom: 6px;
  }

  hr {
    width: 100%;
    height: 1px;
    border: 0;
    background: #eee;
    margin: 18px 0;
  }

  img {
    width: 100%;
  }
`;

export default OverlayDetails;
