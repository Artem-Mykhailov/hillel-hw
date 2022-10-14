import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../../store/actions/User";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const navigate = useNavigate();
  const userList = useSelector((state) => state.users.userList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList());
  }, []);

  function onAlbumClick(e, user) {
    e.stopPropagation();

    navigate(`/${user.id}/albums`);
  }

  return (
    <ul id="userList">
      {userList.map((user, i) => (
        <li key={user.id} className="user-item">
          <p className="item-general">{user.name}</p>
          <p className="item-general">{user.username}</p>
          <p className="item-general">{user.email}</p>
          <button
            id="btn"
            className="btn-general"
            onClick={(e) => onAlbumClick(e, user)}
          >
            Albums
          </button>
        </li>
      ))}
    </ul>
  );
}
