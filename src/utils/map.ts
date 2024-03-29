import { RefObject } from "react";
import { CareProvider, CareProviderSearchResult } from "../types";
import { DivIcon } from "leaflet";
import { latLngBounds, LatLngLiteral, Map } from "leaflet";

export const getMapMarker = (
  result: CareProviderSearchResult | CareProvider,
  selectedResultId: string | undefined = undefined
) => {
  const markerClass =
    selectedResultId === result.id
      ? "custom-map-marker-active"
      : "custom-map-marker";
  const markerNumber = "searchRank" in result ? result.searchRank : "";
  const ariaLabel = markerNumber
    ? `${markerNumber}. ${result.name}`
    : result.name;
  const markerHtml = `<div class='map-marker-pin' aria-label='${ariaLabel}' role='button'><div class='map-marker-text'>${markerNumber}</div></div>`;
  const marker = new DivIcon({
    className: markerClass,
    html: markerHtml,
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
    const bounds = getResultBounds(results);
    bounds &&
      mapRef.current?.fitBounds(bounds, { animate: false, padding: [50, 50] });
  }, 100);
};

/**
 * Helper function to get bounds for the search result map
 * based on the returned set of CareProviderSearchResults.
 * If none of the care providers have latlng data, then the
 * bounds are set based on points pulled from the northwestern
 * and southeastern most points in CO.
 * @param searchResults
 * @returns
 */
export function getResultBounds(searchResults: CareProvider[]) {
  const latLngs = searchResults
    .map((result) => result.latlng)
    .filter((latlng): latlng is LatLngLiteral => !!latlng);

  return latLngs.length ? latLngBounds(latLngs) : undefined;
}

export const CO_CENTER = { lat: 39.113014, lng: -105.358887 };
