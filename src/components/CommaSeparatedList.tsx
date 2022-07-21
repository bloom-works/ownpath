import React from "react";
import { useTranslation } from "react-i18next";

type CommaSeparatedListProps = {
  boolMap: { [key: string]: boolean };
  translationPrefix: string;
};

function CommaSeparatedList({
  boolMap,
  translationPrefix,
}: CommaSeparatedListProps) {
  const { t } = useTranslation();

  return (
    <>
      {Object.entries(boolMap)
        .filter(([_, val]) => !!val)
        .map(([key], idx, arr) => (
          <React.Fragment key={key}>
            {t(`${translationPrefix}${key}`)}
            {idx < arr.length - 1 ? ", " : ""}
          </React.Fragment>
        ))}
    </>
  );
}

export default CommaSeparatedList;
