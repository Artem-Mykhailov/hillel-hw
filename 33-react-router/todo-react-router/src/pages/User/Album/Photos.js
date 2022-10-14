import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../../../store/actions/Photo";
import { useNavigate, useParams } from "react-router-dom";
import "./Photo.css";

export default function Photo() {
  let { albumId } = useParams();
  const navigate = useNavigate();
  const photos = useSelector((state) => state.photos.photoList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList(albumId));
  }, []);

  return (
    <>
      <div className="container-photo">
        <ul id="photoList">
          {photos.map((photo, i) => (
            <li key={photo.id} className="photo-item">
              <p className="photo-title">{photo.title}</p>
              <div className="photo-img">
              <img className="album-photo" src={photo.url} alt="photo from album" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
