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
        <div className="height-8 display-flex flex-justify-center flex-align-center">
          <img alt="logo" src={logo} />
        </div>
        <h2 className="margin-bottom-2 margin-top-10">{header}</h2>
        <p>{body}</p>
        <Link href={url} target="_blank" variant="external">
          {cta}
        </Link>
      </div>
    </Grid>
  );
}
export default ContentCard;
