import React, { useState } from "react";
import "./Todo.css";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { useSelector } from "react-redux";

export default function Todo() {
  const todoList = useSelector((state) => state.todoList);

  return (
    <div className="container">
      <section className="do-list">
        <header className="to-do-header">
          <h2 className="to-do-title">Your To Do List!</h2>
        </header>

        <div className="to-do-content">
          <TodoList todos={todoList} />

          <TodoForm />
        </div>
      </section>
    </div>
  );
}
