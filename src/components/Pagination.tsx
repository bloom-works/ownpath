import { Pagination } from "@trussworks/react-uswds";
import { useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { PaginationContext } from "../pages/Search/Search";
import { CareProviderSearchResult } from "../types";
import { AnalyticsAction, logEvent } from "../utils/analytics";

function ResultsPagination({
  results,
}: {
  results: CareProviderSearchResult[];
}) {
  const { t } = useTranslation();
  const { paginationConfig, setPaginationConfig } =
    useContext(PaginationContext);
  const pageNumber = paginationConfig.currentPage;

  useEffect(() => {
    setPaginationConfig((paginationConfig) => ({
      ...paginationConfig,
      currentPage: 1,
      totalItems: results.length,
      totalPages: Math.ceil(results.length / paginationConfig.pageSize),
    }));
  }, [results]);

  // HACKKKKKK this component to inject translated content and add missing labels for svg icons
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

    setPaginationConfig(() => ({
      ...paginationConfig,
      currentPage: paginationConfig.currentPage + 1,
    }));
  };

  const clickPrevious = () => {
    logEvent(AnalyticsAction.ClickPaginationButton, { pageNumber });
    setPaginationConfig(() => ({
      ...paginationConfig,
      currentPage: paginationConfig.currentPage - 1,
    }));
  };

  const clickPageNumber = (page: any) => {
    logEvent(AnalyticsAction.ClickPaginationButton, { pageNumber });
    setPaginationConfig(() => ({
      ...paginationConfig,
      currentPage: parseInt(page.target.innerHTML),
    }));
  };
  return paginationConfig.totalPages > 1 ? (
    <Pagination
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
