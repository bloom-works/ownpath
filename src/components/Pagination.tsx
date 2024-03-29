import { Pagination } from "@trussworks/react-uswds";
import { useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { SurveyTriggerContext } from "../App";
import { PaginationContext } from "../pages/Search/Search";
import { CareProviderSearchResult } from "../types";
import { AnalyticsAction, logEvent } from "../utils/analytics";

function ResultsPagination({
  results,
}: {
  results: CareProviderSearchResult[];
}) {
  const { t } = useTranslation();

  // Global application state to track trigger events for showing user
  // option to take site survey
  const { incrementTriggerEventCount } = useContext(SurveyTriggerContext);

  const { paginationConfig, setPaginationConfig, setDidChangePage } =
    useContext(PaginationContext);
  const pageNumber = paginationConfig.currentPage;

  useEffect(() => {
    setPaginationConfig((paginationConfig) => ({
      ...paginationConfig,
      currentPage: 1,
      totalItems: results.length,
      totalPages: Math.ceil(results.length / paginationConfig.pageSize),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  // HACK this component to inject translated content and add missing labels for svg icons
  useEffect(() => {
    // Set next button content to translated language, and add title to svg
    if (document.querySelector("button.usa-pagination__next-page")?.innerHTML) {
      (
        document.querySelector(
          "button.usa-pagination__next-page>span"
        ) as HTMLElement
      ).innerHTML = t("next");

      (
        document.querySelector(
          "button.usa-pagination__next-page>svg"
        ) as HTMLElement
      ).setAttribute("title", t("next"));
    }

    // Set previous button content to translated language and add title to svg
    if (
      document.querySelector("button.usa-pagination__previous-page")?.innerHTML
    ) {
      (
        document.querySelector(
          "button.usa-pagination__previous-page > span"
        ) as HTMLElement
      ).innerHTML = t("previous");
      (
        document.querySelector(
          "button.usa-pagination__previous-page>svg"
        ) as HTMLElement
      ).setAttribute("title", t("previous"));
    }
  });

  const clickNext = () => {
    logEvent(AnalyticsAction.ClickPaginationButton, { pageNumber });
    incrementTriggerEventCount();
    setPaginationConfig(() => ({
      ...paginationConfig,
      currentPage: paginationConfig.currentPage + 1,
    }));

    setDidChangePage(true);
  };

  const clickPrevious = () => {
    logEvent(AnalyticsAction.ClickPaginationButton, { pageNumber });
    incrementTriggerEventCount();
    setPaginationConfig(() => ({
      ...paginationConfig,
      currentPage: paginationConfig.currentPage - 1,
    }));

    setDidChangePage(true);
  };

  const clickPageNumber = (page: any) => {
    logEvent(AnalyticsAction.ClickPaginationButton, { pageNumber });
    incrementTriggerEventCount();
    setPaginationConfig(() => ({
      ...paginationConfig,
      currentPage: parseInt(page.target.innerHTML),
    }));

    setDidChangePage(true);
  };
  return paginationConfig.totalPages > 1 ? (
    <Pagination
      className="print-hide"
      key={paginationConfig.currentPage}
      pathname=""
      currentPage={paginationConfig.currentPage}
      onClickNext={clickNext}
      onClickPrevious={clickPrevious}
      maxSlots={5}
      onClickPageNumber={clickPageNumber}
      totalPages={paginationConfig.totalPages}
    />
  ) : (
    <></>
  );
}

export default ResultsPagination;
