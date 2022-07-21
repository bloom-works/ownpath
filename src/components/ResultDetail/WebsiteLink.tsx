import { Link } from "@trussworks/react-uswds";

function WebsiteLink({ url }: { url: string }) {
  const displayUrl = url.replace(/^https:\/\/(www.)?/, "").toLowerCase();
  return (
    <Link
      className="text-wrap"
      variant="external"
      target="#"
      href={encodeURI(url)}
    >
      {displayUrl}
    </Link>
  );
}

export default WebsiteLink;
