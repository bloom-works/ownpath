import React, { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Layout from "./components/Layout";
import Search from "./pages/Search/Search";
import Home from "./pages/Home";
import ResultDetail from "./pages/ResultDetail";
import NotFound from "./pages/NotFound";
import GuidedSearch from "./pages/GuidedSearch";
import FAQ from "./pages/FAQ";
import Compare from "./pages/Compare";
import SurveyPrompt from "./components/SurveyPrompt";

const TRIGGER_EVENT_THRESHOLD = 3;

export const SurveyTriggerContext = createContext<{
  incrementTriggerEventCount: () => void;
}>({ incrementTriggerEventCount: () => {} });

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("title");
  }, []);

  const [count, setCount] = useState(0);
  const [shouldShowSurvey, setShouldShowSurvey] = useState(false);

  useEffect(() => {
    console.log("count", count);
    console.log("should show", shouldShowSurvey);
  });

  return (
    <main className="App">
      <SurveyTriggerContext.Provider
        value={{
          incrementTriggerEventCount: () => {
            setCount((count) => {
              if (count === TRIGGER_EVENT_THRESHOLD - 1)
                setShouldShowSurvey(true);
              return count + 1;
            });
          },
        }}
      >
        <SurveyPrompt
          shouldShowSurvey={shouldShowSurvey}
          hideFunc={() => setShouldShowSurvey(false)}
        />

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="guided-search" element={<GuidedSearch />} />
            <Route path="result/:resultId" element={<ResultDetail />} />
            <Route path="compare" element={<Compare />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </SurveyTriggerContext.Provider>
    </main>
  );
}

export default App;
