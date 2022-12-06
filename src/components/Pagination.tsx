import { Pagination } from "@trussworks/react-uswds";
import { useEffect, useContext } from "react";
import styled from "styled-components";
import { PaginationContext } from "../pages/Search/Search";
import { CareProviderSearchResult } from "../types";
import { AnalyticsAction, logEvent } from "../utils/analytics";

const StyledPagination = styled.div`
  .pagination-header {
    margin-top: 1rem;
    margin-left: 2.5rem;
  }
  .usa-pagination {
    justify-content: left;
    margin-left: 4rem;
  }
  .usa-pagination .usa-current {
    background-color: var(--dark-blue);
  }
  .usa-pagination__button {
    border-color: var(--grey);
  }
  .usa-button usa-button--unstyled usa-pagination__button {
    color: var(--blue);
  }
  .usa-pagination__link {
    color: var(--blue);
  }
`;

function ResultsPagination({
  results,
}: {
  results: CareProviderSearchResult[];
}) {
  const { paging, setPaging } = useContext(PaginationContext);
  const pageNumber = paging.currentPage;

  useEffect(() => {
    setPaging((paging) => ({
      ...paging,
      currentPage: 1,
      totalItems: results.length,
      totalPages: Math.ceil(paging.totalItems / paging.pageSize),
    }));
  }, []);

  const clickNext = () => {
    logEvent(AnalyticsAction.ClickPaginationButton, { pageNumber });
    setPaging((paging) => ({
      ...paging,
      currentPage: paging.currentPage++,
    }));
  };

  const clickPrevious = () => {
    logEvent(AnalyticsAction.ClickPaginationButton, { pageNumber });
    setPaging((paging) => ({
      ...paging,
      currentPage: paging.currentPage--,
    }));
  };

  const clickPageNumber = (page: any) => {
    logEvent(AnalyticsAction.ClickPaginationButton, { pageNumber });
    setPaging((paging) => ({
      ...paging,
      currentPage: parseInt(page.target.innerHTML),
    }));
  };

  return (
    <StyledPagination>
      <Pagination
        pathname=""
        currentPage={paging.currentPage}
        maxSlots={5}
        onClickNext={clickNext}
        onClickPageNumber={clickPageNumber}
        onClickPrevious={clickPrevious}
        totalPages={paging.totalPages}
      />
    </StyledPagination>
  );
}

export default ResultsPagination;
