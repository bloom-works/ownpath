import "leaflet/dist/leaflet.css";

import { LeafletEventHandlerFnMap, Map as LeafletMap } from "leaflet";

import {
  MapContainer,
  MapContainerProps,
  TileLayer,
  TileLayerProps,
  useMapEvents,
} from "react-leaflet";
import { CSSProperties, PropsWithChildren, Ref } from "react";
import { useEffect } from "react";

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
  useEffect(() => {
    // set tabindex = -1 on all <a> elements within the map to
    // keep it out of the keyboard navigation heirarchy
    const links = document.querySelectorAll(".leaflet-container a");
    links.forEach((el) => el.setAttribute("tabindex", "-1"));
  });
  return (
    <MapContainer
      style={{ height: "500px", ...mapContainerStyles }}
      scrollWheelZoom={false}
      zoomControl={false}
      {...mapContainerProps}
      ref={mapRef}
      keyboard={false}
    >
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
