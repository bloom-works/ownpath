import { Grid, Link } from "@trussworks/react-uswds";

type ContentCardProps = {
  logo: string;
  header: string;
  body: string;
  cta: string;
  url: string;
};
function ContentCard({ logo, header, body, cta, url }: ContentCardProps) {
  return (
    <Grid tablet={{ col: true }}>
      <div className="margin-bottom-3 margin-top-6 margin-left-3">
        <div className="height-8 d-inline-flex flex-justify-center flex-align-center">
          <img alt="logo" src={logo} />
        </div>
        <h2 className="margin-bottom-3 margin-top-2">{header}</h2>
        <p>{body}</p>
        <div className="margin-bottom-6"><Link href={url} target="_blank" variant="external">
          {cta}
        </Link></div>
      </div>
    </Grid>
  );
}

export default ContentCard;
