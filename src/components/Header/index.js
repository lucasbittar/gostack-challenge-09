import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import history from '~/services/history';

import { Container, Content, Profile, Logout } from './styles';

import logo from '~/assets/fastfeet-logo.svg';

const navigation = [
  { label: 'Orders', url: '/orders' },
  { label: 'Deliverymen', url: '/deliverymen' },
  { label: 'Recipients', url: '/recipients' },
  { label: 'Issues', url: '/issues' },
];

export default function Header() {
  const { pathname } = history.location;
  const { name } = useSelector((state) => state.user.info);
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Fastfeet" />
          <ul>
            {navigation.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.url}
                  className={pathname.includes(item.url) ? 'active' : null}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <aside>
          <Profile>
            <strong>{name}</strong>
            <Logout>Logout</Logout>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
