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
    <Container onClick={() => onClick()} type={type} primary={primary}>
      {icon}
      {children}
    </Container>
  );
}
