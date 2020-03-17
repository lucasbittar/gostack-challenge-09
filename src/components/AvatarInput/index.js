import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import api from '~/services/api';

import { Container } from './styles';

import { deliverymanAvatarUploadSuccess } from '~/store/modules/deliveryman/actions';

import AvatarPlaceholder from '~/assets/avatar_placeholder.png';
import Profile from '~/components/Profile';

export default function AvatarInput({ avatar }) {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.deliveryman.name);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('upload', data);
    console.tron.log('FILE', data);

    const { id, url } = response.data;

    dispatch(deliverymanAvatarUploadSuccess({ id, url }));
  }

  return (
    <Container>
      <label htmlFor="avatar">
        {name !== '' && avatar === null ? (
          <Profile noName border name={name} />
        ) : (
          <img
            src={avatar !== null ? avatar.url : AvatarPlaceholder}
            alt="avatar"
          />
        )}
        <input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={handleChange}
        />
      </label>
    </Container>
  );
}
