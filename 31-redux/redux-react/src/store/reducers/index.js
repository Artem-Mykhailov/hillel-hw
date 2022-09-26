import {
  ACTION_TODO_DELETE,
  ACTION_TODO_CHANGE_STATUS,
  ACTION_TODO_CREATE,
} from "../actions/Todo";

const INITIAL_STATE = {
  todoList: [
    { title: "Buy some products", status: true, id: "1" },
    { title: "Do my homework", status: false, id: "2" },
    { title: "Cycling for 1 hour", status: true, id: "3" },
    { title: "Some work", status: false, id: "4" },
  ],
};

export default function rootReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case ACTION_TODO_DELETE:
      return {
        ...state,
        todoList: state.todoList.filter((todo) => todo.id !== payload),
      };
    case ACTION_TODO_CREATE:
      return {
        ...state,
        todoList: [...state.todoList, payload],
      };
    case ACTION_TODO_CHANGE_STATUS:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id == payload.id ? (todo = payload.todo) : todo
        ),
      };
    default:
      return state;
  }
}
