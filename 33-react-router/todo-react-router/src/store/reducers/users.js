import { ACTION_USER_FETCH_LIST } from "../actions/User";

const INITIAL_STATE = {
  userList: [],
};

export default function users(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case ACTION_USER_FETCH_LIST:
      return {
        ...state,
        userList: [...payload],
      };
    default:
      return state;
  }
}
