import React, { useState } from "react";
import "./App.css";

function ReactTodo() {
  const [msgInput, setMsgInput] = React.useState("");
  const [todoList, setTodoList] = React.useState([]);

  function onAddBtnClick() {
    setTodoList([...todoList, msgInput]);

    setMsgInput("");
  }

  function onMessageChange(e) {
    setMsgInput(e.target.value);
  }

  return (
    <>
      <div class="container">
        <section class="do-list">
          <header class="to-do-header">
            <h2 class="to-do-title">Your To Do List!</h2>
          </header>

          <div class="to-do-content">
            <ul class="to-do-list">
              {todoList.map((todoItem, i) => (
                <li key={i}>{todoItem}</li>
              ))}
            </ul>

            <input
              id="input-text"
              type="text"
              name="action"
              placeholder="Enter an action to do"
              value={msgInput}
              onChange={onMessageChange}
            />

            <button id="btn" onClick={onAddBtnClick}>
              Add Action
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <ReactTodo />
    </div>
  );
}

export default App;
