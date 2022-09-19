import React, { useState } from "react";
import "./Todo.css";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import useTodo from "./useTodo";

export default function Todo({ defaultMessage, defaultList }) {
  const [editTodo, setEditTodo] = useState();
  const { error, todos, onTodoFormSubmit, onDelete, onChangeStatus } =
    useTodo(defaultList);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <section className="do-list">
        <header className="to-do-header">
          <h2 className="to-do-title">Your To Do List!</h2>
        </header>

        <div className="to-do-content">
          <TodoList
            todos={todos}
            onEdit={setEditTodo}
            onDelete={onDelete}
            onChangeStatus={onChangeStatus}
          />

          <TodoForm
            key={editTodo?.id}
            editTodo={editTodo}
            onSubmit={onTodoFormSubmit}
            defaultMessage={defaultMessage}
          />
        </div>
      </section>
    </div>
  );
}
