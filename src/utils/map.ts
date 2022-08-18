import { CareProviderSearchResult } from "../types";
import { DivIcon } from "leaflet";

export const getMapMarker = (
  result: CareProviderSearchResult,
  selectedResultId: string | undefined
) => {
  const marker = new DivIcon({
    className:
      selectedResultId === result.id
        ? "custom-map-marker-active"
        : "custom-map-marker",
    html: `<div class='map-marker-pin'><div class='map-marker-text'>${result.searchRank}</div></div>`,
    iconSize: [40, 40],
  });
  return selectedResultId === result.id ? marker : marker;
};
