import produce from 'immer';

const INITIAL_STATE = {
  issues: [],
  issuesTotal: 0,
};

export default function order(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@issue/FETCH_ALL_SUCCESS': {
        draft.issues = action.payload.rows;
        draft.issuesTotal = action.payload.count;
        break;
      }
      default:
    }
  });
}
