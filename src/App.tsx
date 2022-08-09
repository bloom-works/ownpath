import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Layout from "./components/Layout";
import Search from "./pages/Search/Search";
import Home from "./pages/Home";
import ResultDetail from "./pages/ResultDetail";
import NotFound from "./pages/NotFound";
import GuidedSearch from "./pages/GuidedSearch";

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("title");
  });

  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="guided-search" element={<GuidedSearch />} />
          <Route path="result/:resultId" element={<ResultDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
