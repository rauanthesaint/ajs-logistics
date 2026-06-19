import { Route, Routes } from "react-router-dom";

import { RootLayout } from "./layouts/root";
import { HomePage } from "@/pages/home";
import { NotFoundPage } from "@/pages/not-found";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}
