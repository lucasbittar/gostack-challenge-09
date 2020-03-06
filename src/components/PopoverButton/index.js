import React from 'react';

import { Container } from './styles';

export default function PopoverButton({ icon, label, clickAction }) {
  return (
    <Container onClick={() => clickAction()}>
      {icon}
      {label}
    </Container>
  );
}
