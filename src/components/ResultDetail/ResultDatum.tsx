import React, { PropsWithChildren } from "react";

type ResultDatumProps = {
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  iconClassName?: string;
  className?: string;
};

function ResultDatum({
  Icon,
  iconClassName = "",
  className,
  children,
}: PropsWithChildren<ResultDatumProps>) {
  return (
    <div className={`margin-y-1 padding-bottom-05 display-flex ${className}`}>
      {Icon && (
        <div className="display-flex flex-justify-center margin-right-05">
          <Icon
            className={`data-icon width-3 margin-top-2px ${iconClassName}`}
          />
        </div>
      )}
      <div className="flex-grow-1">{children}</div>
    </div>
  );
}

export default ResultDatum;
