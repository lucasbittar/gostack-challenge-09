import React from 'react';

import { Container } from './styles';

export default function Heading({ title, children }) {
  return (
    <Container>
      <h1>{title}</h1>
      <aside>{children}</aside>
    </Container>
  );
}
