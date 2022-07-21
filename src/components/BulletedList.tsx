import { useTranslation } from "react-i18next";

type BulletedListProps = {
  boolMap: { [key: string]: boolean };
  translationPrefix: string;
  className?: string;
};

function BulletedList({
  boolMap,
  translationPrefix,
  className,
}: BulletedListProps) {
  const { t } = useTranslation();

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
