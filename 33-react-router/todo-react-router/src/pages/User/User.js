import React from "react";
import UserList from "./UserList";
import "./User.css";

export default function User() {
  return (
    <div className="container">
      <div id="user">
        <header className="user-header">
          <h2 className="user-title">List of Users</h2>
        </header>

        <div className="user-content">
          <div className="labels">
            <p className="label-name">Name</p>
            <p className="label-name">Username</p>
            <p className="label-name">Email</p>
          </div>
          <UserList />
        </div>
      </div>
    </div>
  );
}
