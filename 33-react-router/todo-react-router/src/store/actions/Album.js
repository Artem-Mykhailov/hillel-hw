import AlbumApi from "./AlbumAPI";

export const ACTION_ALBUM_FETCH_LIST = "fetchList";

export function fetchList(id) {
  const idFilter = `?userId=${id}`;
  return (dispatch) => {
    AlbumApi.getList(idFilter).then((list) => {
      dispatch({ type: ACTION_ALBUM_FETCH_LIST, payload: list });
    });
  };
}
