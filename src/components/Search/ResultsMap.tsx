import {
  LatLngBounds,
  LeafletMouseEventHandlerFn,
  Map as LeafletMap,
} from "leaflet";
import { Ref, PropsWithChildren } from "react";
import { ZoomControl } from "react-leaflet";
import Map from "../Map";

export type ResultsMapProps = {
  bounds: LatLngBounds;
  mapRef?: Ref<LeafletMap>;
  mapHeight?: string;
  isMobile?: boolean;
  onClick?: LeafletMouseEventHandlerFn;
};

function ResultsMap({
  bounds,
  mapRef,
  mapHeight,
  isMobile = false,
  onClick,
  children,
}: PropsWithChildren<ResultsMapProps>) {
  return (
    <Map
      mapContainerProps={{
        bounds,
        boundsOptions: { padding: [30, 30] },
        zoomSnap: 0.5,
        zoomDelta: 0.5,
      }}
      mapContainerStyles={{
        height: mapHeight || "100vh",
        display: "flex",
        alignItems: isMobile ? "flex-end" : "flex-start",
        justifyContent: "center",
      }}
      mapRef={mapRef}
      eventHandlers={{ click: onClick }}
    >
      {!isMobile && <ZoomControl position="topright" />}
      {children}
    </Map>
  );
}

export default ResultsMap;
