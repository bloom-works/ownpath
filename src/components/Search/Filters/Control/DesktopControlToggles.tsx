import { Button, Grid } from "@trussworks/react-uswds";
import { useSearchParams } from "react-router-dom";
import { SearchFilters } from "../../../../types";
import {
  getFiltersFromSearchParams,
  toggleItemInList,
} from "../../../../utils";
import { ReactComponent as Close } from "../../../../images/close.svg";
import { useTranslation } from "react-i18next";
import { Dispatch, SetStateAction } from "react";
import {
  getAppliedOptionalFiltersCount,
  getFiltersWithOptionalCleared,
} from "./utils";
import { logEvent, AnalyticsAction } from "../../../../analytics";

type DesktopControlToggleProps = {
  name: string;
  onClick: () => void;
};
function DesktopControlToggle({ name, onClick }: DesktopControlToggleProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      unstyled
      className="margin-right-2 padding-y-05 text-no-underline text-dark-blue width-auto"
    >
      {name} <Close height={10} className="margin-left-05" />
    </Button>
  );
}

type ControlTogglesProps = {
  setFilters: Dispatch<SetStateAction<SearchFilters>>;
};

function ControlToggles({ setFilters }: ControlTogglesProps) {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  let filters = getFiltersFromSearchParams(searchParams);

  // Check if any optional (i.e. besides distance & location) filters are applied
  const optionalFiltersApplied = !!getAppliedOptionalFiltersCount(filters);
  if (!optionalFiltersApplied) return <></>;

  return (
    <Grid row className="margin-bottom-2 flex-align-baseline">
      <span className="text-bold text-dark-blue margin-right-2">
        {t("filteredBy")}:
      </span>
      {filters.accessibility.map((filter) => (
        <DesktopControlToggle
          key="accessibility"
          name={t(`accessibilityShortValues${filter}`)}
          onClick={() =>
            setFilters({
              ...filters,
              accessibility: toggleItemInList(filters.accessibility, filter),
            })
          }
        />
      ))}
      {filters.feePreferences.map((filter) => (
        <DesktopControlToggle
          key="fee-preference"
          name={t(`feesValues${filter}`)}
          onClick={() =>
            setFilters({
              ...filters,
              feePreferences: toggleItemInList(filters.feePreferences, filter),
            })
          }
        />
      ))}
      {filters.hours.map((filter) => (
        <DesktopControlToggle
          key="hours"
          name={t(`hoursValues${filter}`)}
          onClick={() =>
            setFilters({
              ...filters,
              hours: toggleItemInList(filters.hours, filter),
            })
          }
        />
      ))}
      {filters.languages.map((filter) => (
        <DesktopControlToggle
          key="languages"
          name={t(`languageShortValues${filter}`)}
          onClick={() =>
            setFilters({
              ...filters,
              languages: toggleItemInList(filters.languages, filter),
            })
          }
        />
      ))}
      {filters.typesOfHelp.map((filter) => (
        <DesktopControlToggle
          key="types-of-help"
          name={t(`typeOfHelpShortValues${filter}`)}
          onClick={() =>
            setFilters({
              ...filters,
              typesOfHelp: toggleItemInList(filters.typesOfHelp, filter),
            })
          }
        />
      ))}
      {!!filters.age && (
        <DesktopControlToggle
          key="age"
          name={t(`ageShortValues${filters.age}`)}
          onClick={() => {
            const updatedFilters = { ...filters };
            delete updatedFilters.age;
            setFilters(updatedFilters);
          }}
        />
      )}
      <Button
        unstyled
        className="width-auto"
        type="button"
        onClick={() => {
          setFilters(getFiltersWithOptionalCleared(filters));
          logEvent(AnalyticsAction.ApplyFilter, {
            label: "Clear filters button",
          });
        }}
      >
        {t("clearAll")}
      </Button>
    </Grid>
  );
}

export default ControlToggles;
