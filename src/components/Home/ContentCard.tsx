import { Grid, Link } from "@trussworks/react-uswds";
import { ReactNode } from "react";

type ContentCardProps = {
  logo: ReactNode;
  header: string;
  body: string;
  cta: string;
  url: string;
};
function ContentCard({ logo, header, body, cta, url }: ContentCardProps) {
  return (
    <Grid tablet={{ col: true }}>
      <div className="margin-y-3">
        <div className="height-8 display-flex flex-justify-center flex-align-center">
          {logo}
        </div>
        <h2 className="margin-y-2">{header}</h2>
        <p>{body}</p>
        <Link href={url} target="_blank" variant="external">
          {cta}
        </Link>
      </div>
    </Grid>
  );
}

export default ContentCard;
