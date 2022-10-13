import { Routes, Route } from "react-router-dom";
import Photo from "./Photos";
import NotFound from "../../NotFound";

export default function PhotoRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Photo />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
