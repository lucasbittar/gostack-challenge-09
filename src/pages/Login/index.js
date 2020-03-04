import React from 'react';

import logo from '~/assets/fastfeet-logo.svg';

export default function Login() {
  return (
    <>
      <img src={logo} alt="Fastfeet" />

      <form>
        <div className="input-control">
          <label>E-mail:</label>
          <input type="email" placeholder="E-mail" />
        </div>
        <div className="input-control">
          <label>Password:</label>
          <input type="password" placeholder="Password" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
