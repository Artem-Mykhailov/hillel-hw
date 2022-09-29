import React from "react";
import { useDispatch } from "react-redux";
import { remove, changeStatus } from "../store/actions/Todo";

export default function TodoList({ todos }) {
  const dispatch = useDispatch();

  function onDeleteClick(e, todo) {
    e.stopPropagation();

    dispatch(remove(todo.id));
  }

  function onLiClick(e, todo) {
    e.stopPropagation();

    todo.status = !todo.status;

    const changes = {
      id: todo.id,
      todo,
    };

    dispatch(changeStatus(changes));
  }

  return (
    <ul className="to-do-list">
      {todos.map((todoItem, i) => (
        <li
          className={`todoItem ${todoItem.status ? "selectLi" : ""}`}
          key={todoItem.id}
          onClick={(e) => onLiClick(e, todoItem)}
        >
          <p className="item-general">{todoItem.title}</p>

          <button
            type="button"
            className="deleteBtn btn-general"
            onClick={(e) => onDeleteClick(e, todoItem)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
