import { Button, Card, CardBody } from "@trussworks/react-uswds";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { createSearchParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SearchFilters } from "../../types";
import { EMPTY_SEARCH_FILTERS, getZipSearchMetadata } from "../../utils";
import ZipInput from "../ZipInput";

const ZipButton = styled(Button)`
  max-width: 6rem;
  max-height: 2.5rem;
  margin-right: 0;
`;

function ZipCard() {
  const [filters, setFilters] = useState<SearchFilters>(EMPTY_SEARCH_FILTERS);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const zipMeta = getZipSearchMetadata(filters.zip);
  // don't show validation errors until clicking search or clicking out of input
  const [showValidation, setShowValidation] = useState<boolean>(false);

  return (
    <Card
      className="margin-bottom-0"
      containerProps={{
        className: "border-0 margin-bottom-0",
      }}
      gridLayout={{ col: 12, tablet: { col: 4 } }}
    >
      <CardBody>
        <h2>{t("zipCodePrompt")}</h2>
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            if (zipMeta.isValidZip) {
              navigate({
                pathname: "/search",
                search: createSearchParams({
                  ...filters,
                  miles: `${zipMeta.defaultRadiusMiles}`,
                }).toString(),
              });
            } else {
              setShowValidation(true);
            }
          }}
        >
          <ZipInput
            zip={filters.zip}
            setZip={(zip) => setFilters({ ...filters, zip })}
            showError={showValidation}
          >
            <ZipButton type="submit" className="usa-button margin-left-1">
              {t("search")}
            </ZipButton>
          </ZipInput>
        </form>
      </CardBody>
    </Card>
  );
}

export default ZipCard;
