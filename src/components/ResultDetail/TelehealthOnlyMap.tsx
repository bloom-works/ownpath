import { useTranslation } from "react-i18next";
import Map from "../Map";
import styled from "styled-components";
import AppAlert from "../AppAlert";
import { ReactComponent as Info } from "../../images/info.svg";
import { useEffect, useRef } from "react";
import { Map as LeafletMap } from "leaflet";

const MapOverlayContainer = styled.div`
  z-index: 5000;
  background: white;
  border-radius: 0.5rem;
  margin: 0 2rem;
`;

function TelehealthOnlyMap() {
  const { t } = useTranslation();
  const mapRef = useRef<LeafletMap>(null);

  useEffect(() => {
    mapRef.current?.eachLayer((l) => {
      l.getPane()?.classList.add("opacity-50");
    });
  });
  return (
    <Map
      mapRef={mapRef}
      mapContainerProps={{
        center: { lat: 39.113014, lng: -105.358887 },
        zoom: 6,
      }}
      mapContainerStyles={{
        flex: 1,
        height: "300px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      <MapOverlayContainer>
        <AppAlert Icon={Info}>{t("telehealthMapExplainer")}</AppAlert>
      </MapOverlayContainer>
    </Map>
  );
}

export default TelehealthOnlyMap;
