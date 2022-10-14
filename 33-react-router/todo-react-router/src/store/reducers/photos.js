import { ACTION_PHOTO_FETCH_LIST } from "../actions/Photo";

const INITIAL_STATE = {
  photoList: [],
};

export default function photos(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case ACTION_PHOTO_FETCH_LIST:
      return {
        ...state,
        photoList: [...payload],
      };
    default:
      return state;
  }
}
