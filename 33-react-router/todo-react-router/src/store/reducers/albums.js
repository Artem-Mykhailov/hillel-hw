import { ACTION_ALBUM_FETCH_LIST } from "../actions/Album";

const INITIAL_STATE = {
  albumList: [],
};

export default function albums(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case ACTION_ALBUM_FETCH_LIST:
      return {
        ...state,
        albumList: [...payload],
      };
    default:
      return state;
  }
}
