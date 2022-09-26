export const ACTION_TODO_DELETE = "remove";
export const ACTION_TODO_CHANGE_STATUS = "changeStatus";
export const ACTION_TODO_CREATE = "create";

export function remove(id) {
  return { type: ACTION_TODO_DELETE, payload: id };
}

export function changeStatus(changes) {
  return { type: ACTION_TODO_CHANGE_STATUS, payload: changes };
}
export function create(todo) {
  return { type: ACTION_TODO_CREATE, payload: todo };
}
