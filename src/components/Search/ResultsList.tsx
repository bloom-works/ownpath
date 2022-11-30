import { CareProviderSearchResult, Paging } from "../../types";
import ResultCard from "./ResultCard";

type ResultsListProps = {
  results: CareProviderSearchResult[];
  selectedResultId?: string;
  isMobile?: boolean;
  paging: Paging;
};

const DESKTOP_CLASSES =
  "border-bottom border-base-lighter padding-y-3 padding-x-5";
const DESKTOP_CLASSES_ACTIVE =
  "border-05 radius-sm border-primary-light padding-y-3 padding-x-5";
const MOBILE_CLASSES =
  "border border-base-lighter radius-lg padding-2 margin-bottom-1";

function ResultsList({
  results,
  selectedResultId,
  isMobile = false,
  paging,
}: ResultsListProps) {
  return (
    <>
      {results.length > 0 &&
        results
          .slice((paging.currentPage - 1) * paging.pageSize)
          .slice(0, paging.pageSize)
          .map((result) => (
            <div
              className={
                isMobile
                  ? MOBILE_CLASSES
                  : selectedResultId === result.id
                  ? DESKTOP_CLASSES_ACTIVE
                  : DESKTOP_CLASSES
              }
              // Only set id in the desktop list to avoid creating
              // duplicate DOM elements with same id in mobile list
              id={isMobile ? undefined : result.id}
              key={result.id}
            >
              <ResultCard data={result} />
            </div>
          ))}
    </>
  );
}

export default ResultsList;
