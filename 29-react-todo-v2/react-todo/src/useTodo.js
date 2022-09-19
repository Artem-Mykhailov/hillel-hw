import { useEffect, useState } from "react";
import TodoApi from "./TodoAPI.js";

export default function useTodo(defaultList) {
  const [error, setError] = useState("");
  const [todos, setTodo] = useState(defaultList);

  function showError(e) {
    setError(e.message);
  }

  useEffect(() => {
    TodoApi.getList().then(setTodo).catch(showError);
  }, []);

  function onChangeStatus(id, todo) {
    todo.status = !todo.status;
    TodoApi.update(todo.id, todo)
      .then((newTodo) => {
        const newList = todos.map((todoItem) =>
          todoItem.id === newTodo.id ? newTodo : todoItem
        );

        setTodo(newList);
      })
      .catch(showError);
  }

  function onDelete(id) {
    TodoApi.delete(id)
      .then((newTodo) => {
        const newList = todos.filter((item) => item.id !== newTodo.id);

        setTodo(newList);
      })
      .catch(showError);
  }

  function onTodoFormSubmit(todo) {
    if (todo.id) {
      TodoApi.update(todo.id, todo)
        .then((newTodo) => {
          const newList = todos.map((todoItem) =>
            todoItem.id === newTodo.id ? newTodo : todoItem
          );

          setTodo(newList);
        })
        .catch(showError);
    } else {
      TodoApi.create(todo)
        .then((newTodo) => {
          setTodo([...todos, newTodo]);
        })
        .catch(showError);
    }
  }

  return { error, todos, onTodoFormSubmit, onDelete, onChangeStatus };
}
