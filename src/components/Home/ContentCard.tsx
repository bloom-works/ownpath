import { Card, CardBody, CardFooter } from "@trussworks/react-uswds";
import { ReactNode } from "react";

type ContentCardProps = {
  headerContent: ReactNode;
  bodyContent: ReactNode;
  cta?: ReactNode;
  fullWidth?: boolean;
};
function ContentCard({
  headerContent,
  bodyContent,
  cta,
  fullWidth = false,
}: ContentCardProps) {
  return (
    <Card
      containerProps={{
        className: `bg-base-lightest border-0 ${
          fullWidth ? "display-flex flex-row" : ""
        }`,
      }}
      gridLayout={{ mobile: { col: 12 }, tablet: { col: fullWidth ? 12 : 4 } }}
    >
      <div className="usa-card__header-alt height-15 display-flex flex-justify-center flex-align-center">
        {headerContent}
      </div>
      <CardBody className={fullWidth ? "padding-top-2" : ""}>
        {bodyContent}
      </CardBody>
      {cta && <CardFooter>{cta}</CardFooter>}
    </Card>
  );
}

export default ContentCard;
