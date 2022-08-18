import { RefObject } from "react";
import { CareProvider, CareProviderSearchResult } from "../types";
import { DivIcon } from "leaflet";
import { latLngBounds, LatLngLiteral, Map } from "leaflet";

export const getMapMarker = (
  result: CareProviderSearchResult | CareProvider,
  selectedResultId: string | undefined = undefined
) => {
  const markerText = "searchRank" in result ? result.searchRank : "";
  const markerClass =
    selectedResultId === result.id
      ? "custom-map-marker-active"
      : "custom-map-marker";
  const marker = new DivIcon({
    className: markerClass,
    html: `<div class='map-marker-pin'><div class='map-marker-text'>${markerText}</div></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 46], // adjusts icon placement so that the pin point sits on the latlong location
  });
  return marker;
};

export const rerenderMap = (
  mapRef: RefObject<Map>,
  results: CareProviderSearchResult[]
) => {
  setTimeout(() => {
    mapRef.current?.invalidateSize();
    mapRef.current?.fitBounds(getResultBounds(results), { animate: false });
  }, 100);
};

/**
 * Helper function to get bounds for the search result map
 * based on the returned set of CareProviderSearchResults
 * @param searchResults
 * @returns
 */
export function getResultBounds(searchResults: CareProviderSearchResult[]) {
  return latLngBounds(
    searchResults
      .map((result) => result.latlng)
      .filter((location): location is LatLngLiteral => !!location)
  );
}
