import { Pagination } from "@trussworks/react-uswds";
import { useEffect, useState } from "react";
import { CareProviderSearchResult, Paging } from "../types";

function ResultsPagination({
  results,
}: {
  results: CareProviderSearchResult[];
  paging: Paging;
}) {
  const [paging, setPaging] = useState<Paging>({
    totalPages: 0,
    currentPage: 1,
    totalItems: 0,
    pageSize: 20,
  });

  useEffect(() => {
    setPaging((paging) => ({
      ...paging,
      currentPage: 1,
      totalItems: results.length,
      totalPages: Math.ceil(paging.totalItems / paging.pageSize),
    }));
  }, []);

  const clickNext = () => {
    setPaging((paging) => ({
      ...paging,
      currentPage: paging.currentPage++,
      pageSize: paging.pageSize,
    }));
  };

  const clickPrevious = () => {
    setPaging((paging) => ({
      ...paging,
      currentPage: paging.currentPage--,
      pageSize: paging.pageSize,
    }));
  };

  // const clickPageNumber = (page: any) => {
  //   setPaging((paging) => ({
  //     ...paging,
  //     currentPage: page.target.innerHTML,
  //     pageSize: paging.pageSize,
  //   }));
  // console.log("pagination currentPage CLICKPAGE", paging.currentPage);
  // console.log("page value", page.target.innerHTML);
  // };

  return (
    <Pagination
      pathname=""
      currentPage={paging.currentPage}
      maxSlots={6}
      onClickNext={clickNext}
      onClickPageNumber={function noRefCheck() {}}
      onClickPrevious={clickPrevious}
      // totalPages={paging.totalPages}
      totalPages={5}
    />
  );
}

export default ResultsPagination;
