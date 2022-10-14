import { Routes, Route } from "react-router-dom";
import Album from "./Album";
import PhotoRoutes from "./PhotoRoutes";
import NotFound from "../../NotFound";

export default function AlbumRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Album />} />
      <Route path="/:albumId/photos" element={<PhotoRoutes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
