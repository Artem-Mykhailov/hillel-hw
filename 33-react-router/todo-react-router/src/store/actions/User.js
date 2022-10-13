import UserApi from "./UserAPI";

export const ACTION_USER_FETCH_LIST = "fetchList";

export function fetchList() {
  return (dispatch) => {
    UserApi.getList().then((list) => {
      dispatch({ type: ACTION_USER_FETCH_LIST, payload: list });
    });
  };
}
