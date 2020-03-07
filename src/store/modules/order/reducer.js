import produce from 'immer';

const INITIAL_STATE = {
  product: null,
  deliveryman: null,
  recipient: null,
  saving: false,
};

export default function order(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@order/CREATE_REQUEST': {
        draft.saving = true;
        break;
      }
      case '@order/CREATE_SUCCESS': {
        draft.saving = false;
        break;
      }
      case '@order/UPDATE_REQUEST': {
        draft.saving = true;
        break;
      }
      case '@order/UPDATE_SUCCESS': {
        draft.saving = false;
        break;
      }
      default:
    }
  });
}
