import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Layout from "./components/Layout";
import Search from "./pages/Search/Search";
import Home from "./pages/Home";
import ResultDetail from "./pages/ResultDetail";
import Whoops from "./pages/Whoops";
import GuidedSearch from "./pages/GuidedSearch";

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("common.title");
  });

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="guided-search" element={<GuidedSearch />} />
          <Route path="result/:resultId" element={<ResultDetail />} />
          <Route path="*" element={<Whoops />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
