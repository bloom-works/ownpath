import "leaflet/dist/leaflet.css";

import { Icon, LeafletEventHandlerFnMap, Map as LeafletMap } from "leaflet";

import {
  MapContainer,
  MapContainerProps,
  TileLayer,
  TileLayerProps,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import { CSSProperties, PropsWithChildren, Ref, RefObject } from "react";

import mapMarker from "../images/map-marker.svg";
import mapMarkerActive from "../images/map-marker-active.svg";
import { CareProviderSearchResult } from "../types";
import { getResultBounds } from "../utils";

const markerIcon = new Icon({ iconUrl: mapMarker, iconSize: [32, 32] });
const markerActiveIcon = new Icon({
  iconUrl: mapMarkerActive,
  iconSize: [32, 32],
});

const rerenderMap = (
  mapRef: RefObject<LeafletMap>,
  results: CareProviderSearchResult[]
) => {
  setTimeout(() => {
    mapRef.current?.invalidateSize();
    mapRef.current?.fitBounds(getResultBounds(results), { animate: false });
  }, 100);
};

function MapEvents({
  eventHandlers,
}: {
  eventHandlers: LeafletEventHandlerFnMap;
}) {
  useMapEvents(eventHandlers);
  return null;
}

type MapProps = {
  mapContainerProps?: Exclude<MapContainerProps, "style">;
  mapContainerStyles?: CSSProperties;
  tileLayerProps?: Partial<TileLayerProps>;
  mapRef?: Ref<LeafletMap>; // to enable external access of underlying Map instance
  eventHandlers?: LeafletEventHandlerFnMap;
};

function Map({
  mapContainerProps,
  mapContainerStyles,
  tileLayerProps,
  mapRef,
  eventHandlers = {},
  children,
}: PropsWithChildren<MapProps>) {
  return (
    <MapContainer
      style={{ height: "500px", ...mapContainerStyles }}
      scrollWheelZoom={false}
      zoomControl={false}
      {...mapContainerProps}
      ref={mapRef}
    >
      <ZoomControl position="topright" />
      <MapEvents eventHandlers={eventHandlers} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
        {...tileLayerProps}
      />
      {children}
    </MapContainer>
  );
}

export default Map;
export { markerIcon, markerActiveIcon, rerenderMap };
