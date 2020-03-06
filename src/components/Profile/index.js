import React from 'react';
import randomColor from 'random-color';

import { Container, Initials } from './styles';

const initials = (name) => {
  const fullNameArray = name.split(' ');
  const firstInitial = fullNameArray[0].split('')[0];
  const hasLastName = fullNameArray.length - 1 !== 0;
  if (hasLastName) {
    const lastInitial = fullNameArray[fullNameArray.length - 1].split('')[0];
    return firstInitial + lastInitial;
  }
  return firstInitial;
};

export default function Profile({ name, avatar }) {
  const color = randomColor();
  return (
    <Container>
      {avatar ? (
        <img src={avatar} alt={name} />
      ) : (
        <Initials color={color.hexString()}>{initials(name)}</Initials>
      )}
      <span>{name}</span>
    </Container>
  );
}
