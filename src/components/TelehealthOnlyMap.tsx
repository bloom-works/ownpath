import Map from "./Map";
import styled from "styled-components";
import AppAlert from "./AppAlert";
import { ReactComponent as Info } from "../images/info.svg";
import { CSSProperties, useRef } from "react";
import { Map as LeafletMap } from "leaflet";
import { CO_CENTER } from "../utils";
import { Pane } from "react-leaflet";

const MessageOverlayContainer = styled.div`
  z-index: 5000;
  background: white;
  border-radius: 0.5rem;
  margin: 0 2rem;
`;

const ShadowOverlayContainer = styled.div`
  z-index: 4000;
  background: black;
  height: 300px;
  width: 100vw;
  filter: opacity(50%);
`;

type TelehealthOnlyMapProps = {
  alertMessage: string;
  mapContainerStyles?: CSSProperties;
};
function TelehealthOnlyMap({
  alertMessage,
  mapContainerStyles = {},
}: TelehealthOnlyMapProps) {
  const mapRef = useRef<LeafletMap>(null);

  return (
    <Map
      mapRef={mapRef}
      mapContainerProps={{
        center: CO_CENTER,
        zoom: 6,
      }}
      mapContainerStyles={{
        flex: 1,
        height: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...mapContainerStyles,
      }}
    >
      <Pane name="shadow">
        <ShadowOverlayContainer></ShadowOverlayContainer>
      </Pane>
      <MessageOverlayContainer>
        <AppAlert Icon={Info}>{alertMessage}</AppAlert>
      </MessageOverlayContainer>
    </Map>
  );
}

export default TelehealthOnlyMap;
