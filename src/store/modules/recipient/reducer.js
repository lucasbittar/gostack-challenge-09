import produce from 'immer';

const INITIAL_STATE = {
  saving: false,
  recipients: [],
  recipientsTotal: 0,
};

export default function order(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      /*
      case '@order/INPUT_CHANGE': {
        console.tron.log('ACTION', action.payload);
        draft[action.payload.input] = action.payload.value;
        break;
      }
      */
      case '@recipient/FETCH_ALL_SUCCESS': {
        draft.recipients = action.payload.rows;
        draft.recipientsTotal = action.payload.count;
        break;
      }
      /*
      case '@order/FETCH_SUCCESS': {
        draft.product = action.payload.product;
        draft.deliveryman = action.payload.deliveryman_id;
        draft.recipient = action.payload.recipient_id;
        break;
      }
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
      */
      default:
    }
  });
}
