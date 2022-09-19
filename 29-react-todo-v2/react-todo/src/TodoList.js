import React from "react";

export default function TodoList({ todos, onEdit, onDelete }) {
  function onEditClick(e, todo) {
    e.stopPropagation();

    onEdit(todo);
  }

  function onDeleteClick(e, todo) {
    e.stopPropagation();

    onDelete(todo.id);
  }

  return (
    <ul className="to-do-list">
      {todos.map((todoItem, i) => (
        <li className="todoItem {status}" key={todoItem.id}>
          <p className="item-general">{todoItem.title}</p>
          <button
            type="button"
            className="editBtn btn-general"
            onClick={(e) => onEditClick(e, todoItem)}
          >
            Edit
          </button>
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
