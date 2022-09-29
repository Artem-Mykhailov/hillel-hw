import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { create } from "../store/actions/Todo";

export default function TodoForm() {
  const dispatch = useDispatch();
  const [msgInput, setMsgInput] = useState("");

  function onFormSubmit(e) {
    e.preventDefault();

    const newTodo = {
      status: false,
      title: msgInput,
    };

    dispatch(create(newTodo));
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
