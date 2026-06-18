import { Route, Routes } from "react-router-dom";

import { RootLayout } from "./layouts/root";
import { HomePage } from "@/pages/home";
import { NotFoundPage } from "@/pages/not-found";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
