import { Card, CardBody, CardFooter, Link } from "@trussworks/react-uswds";
import { ReactNode } from "react";
import styled from "styled-components";

const TransparentCard = styled(Card)`
  .usa-card__container {
    background: none;
  }
`;

type ContentCardProps = {
  logo: ReactNode;
  header: string;
  body: string;
  cta: string;
  url: string;
};
function ContentCard({ logo, header, body, cta, url }: ContentCardProps) {
  return (
    <TransparentCard
      containerProps={{
        className: `border-0 bg-none`,
      }}
      gridLayout={{ mobile: { col: 12 }, tablet: { col: 4 } }}
    >
      <div className="usa-card__header-alt height-15 display-flex flex-justify-center flex-align-center">
        {logo}
      </div>
      <CardBody>
        <h2>{header}</h2>
        <p>{body}</p>
      </CardBody>
      <CardFooter>
        {
          <Link href={url} target="_blank" variant="external">
            {cta}
          </Link>
        }
      </CardFooter>
    </TransparentCard>
  );
}

export default ContentCard;
