import { useContext } from "react";
import { CareProviderSearchResult } from "../../types";
import ResultCard from "./ResultCard";
import { PaginationContext } from "../../pages/Search/Search";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

type ResultsListProps = {
  results: CareProviderSearchResult[];
  selectedResultId?: string;
  isMobile?: boolean;
};

const DESKTOP_CLASSES =
  "border-bottom border-base-lighter padding-y-3 padding-x-5";
const DESKTOP_CLASSES_ACTIVE =
  "border-05 radius-sm border-primary-light padding-y-3 padding-x-5";
const MOBILE_CLASSES =
  "border border-base-lighter radius-lg padding-2 margin-bottom-1";

const StyledResultsPagination = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 2.5rem;
  .hr {
    margin-left: -3.5rem;
    color: #51534b;
  }
`;

function ResultsList({
  results,
  selectedResultId,
  isMobile = false,
}: ResultsListProps) {
  const { t } = useTranslation();
  const { paginationConfig } = useContext(PaginationContext);

  const resultsSlice = results
    .slice((paginationConfig.currentPage - 1) * paginationConfig.pageSize)
    .slice(0, paginationConfig.pageSize);

  return (
    <>
      <StyledResultsPagination>
        <div>
          {t("paginationHeading", {
            firstResult: resultsSlice[0].searchRank,
            lastResult: resultsSlice[0].searchRank + resultsSlice.length - 1,
            results: results.length,
          })}
        </div>
        <hr className="hr" />
      </StyledResultsPagination>
      {results.length > 0 &&
        resultsSlice.map((result) => (
          <div
            className={
              isMobile
                ? MOBILE_CLASSES
                : selectedResultId === result.id
                ? DESKTOP_CLASSES_ACTIVE
                : DESKTOP_CLASSES
            }
            key={result.id}
          >
            <ResultCard data={result} isMobile={isMobile} />
          </div>
        ))}
    </>
  );
}

export default ResultsList;
