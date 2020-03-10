import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { loginRequest } from '~/store/modules/auth/actions';

import { InputControl } from '~/components/Layout';

import logo from '~/assets/fastfeet-logo.svg';

const schema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Verify your password. Min of 6 characters')
    .required('Password is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

export default function Login() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit({ email, password }) {
    schema
      .validate({
        email,
        password,
      })
      .catch(function(err) {
        toast.error(err.message);
      })
      .then(function(valid) {
        if (valid) {
          dispatch(loginRequest(email, password));
        }
      });
  }

  return (
    <>
      <img src={logo} alt="Fastfeet" />

      <Form onSubmit={handleSubmit}>
        <InputControl uppercase>
          <label>E-mail:</label>
          <Input name="email" type="email" placeholder="E-mail" />
        </InputControl>
        <InputControl uppercase>
          <label>Password:</label>
          <Input name="password" type="password" placeholder="Password" />
        </InputControl>
        <button type="submit">{loading ? 'Loading...' : 'Submit'}</button>
      </Form>
    </>
  );
}
