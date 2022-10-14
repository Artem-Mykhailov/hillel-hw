import PhotoApi from "./PhotoAPI";

export const ACTION_PHOTO_FETCH_LIST = "fetchList";

export function fetchList(id) {
  const idFilter = `?albumId=${id}`;
  return (dispatch) => {
    PhotoApi.getList(idFilter).then((list) => {
      dispatch({ type: ACTION_PHOTO_FETCH_LIST, payload: list });
    });
  };
}
