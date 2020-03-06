import produce from 'immer';

const INITIAL_STATE = {
  info: null,
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/LOGIN_SUCCESS':
      return produce(state, (draft) => {
        draft.info = action.payload.user;
      });
    default:
      return state;
  }
}
