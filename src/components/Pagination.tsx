import { Pagination } from "@trussworks/react-uswds";
import { useEffect, useContext } from "react";
import { PaginationContext } from "../pages/Search/Search";
import { CareProviderSearchResult } from "../types";
import { AnalyticsAction, logEvent } from "../utils/analytics";

function ResultsPagination({
  results,
}: {
  results: CareProviderSearchResult[];
}) {
  const { paginationConfig, setPaginationConfig } =
    useContext(PaginationContext);
  const pageNumber = paginationConfig.currentPage;

  useEffect(() => {
    setPaginationConfig((paginationConfig) => ({
      ...paginationConfig,
      currentPage: 1,
      totalItems: results.length,
      totalPages: Math.ceil(
        paginationConfig.totalItems / paginationConfig.pageSize
      ),
    }));
  }, []);

  // const clickNext = () => {
  //   logEvent(AnalyticsAction.ClickPaginationButton, { pageNumber });
  //   setPaginationConfig((paginationConfig) => ({
  //     ...paginationConfig,
  //     currentPage: paginationConfig.currentPage++,
  //   }));
  // };

  // const clickPrevious = () => {
  //   logEvent(AnalyticsAction.ClickPaginationButton, { pageNumber });
  //   setPaginationConfig((paginationConfig) => ({
  //     ...paginationConfig,
  //     currentPage: paginationConfig.currentPage--,
  //   }));
  // };

  const clickPageNumber = (page: any) => {
    logEvent(AnalyticsAction.ClickPaginationButton, { pageNumber });
    setPaginationConfig((paginationConfig) => ({
      ...paginationConfig,
      currentPage: parseInt(page.target.innerHTML),
    }));
  };

  return (
    <Pagination
      pathname=""
      currentPage={paginationConfig.currentPage}
      maxSlots={5}
      onClickPageNumber={clickPageNumber}
      totalPages={paginationConfig.totalPages}
    />
  );
}

export default ResultsPagination;
