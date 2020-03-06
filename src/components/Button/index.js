import React from 'react';

import { Container } from './styles';

export default function Button({ children, icon, click, primary }) {
  return (
    <Container onClick={() => click()} primary={primary}>
      {icon}
      {children}
    </Container>
  );
}
