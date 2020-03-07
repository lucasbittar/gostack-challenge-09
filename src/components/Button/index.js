import React from 'react';

import { Container } from './styles';

export default function Button({
  children,
  icon,
  onClick = () => {},
  type,
  primary,
}) {
  return (
    <Container onClick={() => onClick()} primary={primary} type={type}>
      {icon}
      {children}
    </Container>
  );
}
