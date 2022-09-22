import React from "react";

export default function TodoList({ todos, onEdit, onDelete, onChangeStatus }) {
  function onEditClick(e, todo) {
    e.stopPropagation();

    onEdit(todo);
  }

  function onDeleteClick(e, todo) {
    e.stopPropagation();

    onDelete(todo.id);
  }

  function onLiClick(e, todo) {
    e.stopPropagation();

    onChangeStatus(todo.id, todo);
  }

  return (
    <ul className="to-do-list">
      {todos.map((todoItem, i) => (
        <li className={`todoItem ${todoItem.status ? "selectLi" : ""}`} 
        key={todoItem.id}
        onClick={(e) => onLiClick(e, todoItem)}
        >
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
