import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { loginRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/fastfeet-logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Verify your password. Min of 6 characters')
    .required('Password is required'),
});

export default function Login() {
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(loginRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="Fastfeet" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <div className="input-control">
          <label>E-mail:</label>
          <Input name="email" type="email" placeholder="E-mail" />
        </div>
        <div className="input-control">
          <label>Password:</label>
          <Input name="password" type="password" placeholder="Password" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </>
  );
}
