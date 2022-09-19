import React, { useState } from "react";

export default function TodoForm({ editTodo, onSubmit, defaultMessage }) {
  const [msgInput, setMsgInput] = useState(editTodo?.title ?? defaultMessage);

  function onFormSubmit(e) {
    e.preventDefault();

    const newTodo = {
      status: false,
      ...editTodo,
      title: msgInput,
    };

    onSubmit(newTodo);
    setMsgInput("");
  }

  function onMessageChange(e) {
    setMsgInput(e.target.value);
  }

  return (
    <form onSubmit={onFormSubmit}>
      <input
        id="input-text"
        type="text"
        name="action"
        placeholder="Enter an action to do"
        value={msgInput}
        onChange={onMessageChange}
      />

      <button id="btn">Add Action</button>
    </form>
  );
}
