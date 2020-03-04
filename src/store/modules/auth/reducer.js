import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  loggedIn: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/LOGIN_SUCCESS':
      return produce(state, (draft) => {
        draft.token = action.payload.token;
        draft.loggedIn = true;
      });
    default:
      return state;
  }
}
