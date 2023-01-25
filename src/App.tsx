import React, { createContext, useEffect, useRef, useState } from "react";
import { Modal, ModalRef } from "@trussworks/react-uswds";
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
  triggerEventCount: number;
  incrementTriggerEventCount: () => void;
}>({ triggerEventCount: 0, incrementTriggerEventCount: () => {} });

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("title");
  });

  const modalRef = useRef<ModalRef>(null);
  const [count, setCount] = useState(0);
  const [surveyPrompted, setSurveyPrompted] = useState(false);
  useEffect(() => {
    if (count > TRIGGER_EVENT_THRESHOLD - 1 && !surveyPrompted) {
      modalRef.current?.toggleModal();
      setSurveyPrompted(true);
    }
  }, [count, surveyPrompted]);

  return (
    <main className="App">
      <SurveyTriggerContext.Provider
        value={{
          triggerEventCount: count,
          incrementTriggerEventCount: () => {
            setCount((count) => {
              if (count < TRIGGER_EVENT_THRESHOLD) return count + 1;
              return count;
            });
          },
        }}
      >
        <Modal id="survey-modal" ref={modalRef}>
          <SurveyPrompt modalRef={modalRef} />
        </Modal>
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
