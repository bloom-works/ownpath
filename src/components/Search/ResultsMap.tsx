import { Button } from "@trussworks/react-uswds";
import {
  LatLngBounds,
  LeafletMouseEventHandlerFn,
  Map as LeafletMap,
} from "leaflet";
import { Ref, PropsWithChildren } from "react";
import styled from "styled-components";
import Map from "../Map";

const ToggleTelehealthMapButton = styled(Button)`
  z-index: 2000;
  position: relative;
  width: 80%;
  margin: 0 10%;
  top: 2rem;
`;

export type ResultsMapProps = {
  bounds: LatLngBounds;
  mapRef?: Ref<LeafletMap>;
  isMobile?: boolean;
  onClick?: LeafletMouseEventHandlerFn;
};

function ResultsMap({
  bounds,
  mapRef,
  isMobile = false,
  onClick,
  children,
}: PropsWithChildren<ResultsMapProps>) {
  return (
    <Map
      mapContainerProps={{
        bounds,
        boundsOptions: { padding: [20, 20] },
        zoomSnap: 0.5,
        zoomDelta: 0.5,
      }}
      mapContainerStyles={{
        height: isMobile ? "300px" : "100vh",
      }}
      mapRef={mapRef}
      eventHandlers={{ click: onClick }}
    >
      {children}
      <ToggleTelehealthMapButton
        type="button"
        className="radius-pill display-flex flex-align-center flex-justify-center text-body-md"
      >
        BUTTON
      </ToggleTelehealthMapButton>
    </Map>
  );
}

export default ResultsMap;
