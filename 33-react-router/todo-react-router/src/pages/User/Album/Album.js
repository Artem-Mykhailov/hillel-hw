import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../../../store/actions/Album";
import { useNavigate, useParams } from "react-router-dom";
import "./Album.css";

export default function Album() {
  let { userId } = useParams();
  const navigate = useNavigate();
  const albums = useSelector((state) => state.albums.albumList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList(userId));
  }, []);

  function onPhotoClick(e, album) {
    e.stopPropagation();

    navigate(`/${album.userId}/albums/${album.id}/photos`);
  }

  return (
    <>
      <div className="container-album">
        <div className="album-content">
          <ul id="albumList">
            {albums.map((album, i) => (
              <li key={album.id} className="album-item">
                <p className="item-general">{album.title}</p>
                <button
                  id="btn"
                  className="btn-general"
                  onClick={(e) => onPhotoClick(e, album)}
                >
                  Photos
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
