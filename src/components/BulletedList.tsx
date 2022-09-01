import { useTranslation } from "react-i18next";
import { anyAreTrue } from "../utils";

type BulletedListProps = {
  boolMap: { [key: string]: boolean };
  translationPrefix?: string;
  className?: string;
  emptyMsg?: string;
};

function BulletedList({
  boolMap,
  translationPrefix = "",
  className,
  emptyMsg,
}: BulletedListProps) {
  const { t } = useTranslation();

  if (emptyMsg && !anyAreTrue(boolMap)) {
    return <p>{emptyMsg}</p>;
  }

  return (
    <>
      {Object.entries(boolMap)
        .filter(([_, val]) => !!val)
        .map(([key], idx) => (
          <li key={idx} className={className}>
            {t(`${translationPrefix}${key}`)}
          </li>
        ))}
    </>
  );
}

export default BulletedList;
