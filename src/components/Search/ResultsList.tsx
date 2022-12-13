import { Ref, useEffect, useRef } from "react";
import { CareProviderSearchResult } from "../../types";
import ResultCard from "./ResultCard";

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

function ResultsList({
  results,
  selectedResultId,
  isMobile = false,
}: ResultsListProps) {
  const listRef: Ref<HTMLDivElement> = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef?.current) {
      listRef.current.scrollTop = 0;
    }
  }, [results]);

  return (
    <>
      {results.map((result) => (
        <div
          ref={listRef}
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
