import { Routes, Route } from "react-router-dom";
import User from "./User";
import AlbumRoutes from "./Album/AlbumRoutes";
import NotFound from "../NotFound";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<User />} />
      <Route path="/:userId/albums/*" element={<AlbumRoutes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
