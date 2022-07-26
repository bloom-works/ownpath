import { Grid, Button, Alert } from "@trussworks/react-uswds";
import { Marker } from "react-leaflet";
import { Map as LeafletMap } from "leaflet";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { logEvent, AnalyticsAction } from "../../analytics";
import { markerActiveIcon, markerIcon } from "../../components/Map";
import MobileViewToggle from "../../components/Search/MobileViewToggle";
import ResultCard from "../../components/Search/ResultCard";
import ResultsList from "../../components/Search/ResultsList";
import ResultsMap from "../../components/Search/ResultsMap";
import { CareProviderSearchResult } from "../../types";
import { getResultBounds } from "../../utils";
import { ReactComponent as Close } from "../../images/close.svg";

const T_PREFIX = "pages.search.";

/**
 * The toggle-able list + map views for mobile,
 * which are visually hidden in tablet/desktop via CSS
 * and always hidden from screen readers (via aria-hidden=true)
 * to avoid duplication of results lists to screen readers
 */
function MobileResults({ results }: { results: CareProviderSearchResult[] }) {
  // Flag to track map vs list view
  const [isListView, setIsListView] = useState(true);

  const { t } = useTranslation();

  const mapRef = useRef<LeafletMap>(null);
  const rerenderMap = () => {
    setTimeout(() => {
      mapRef.current?.invalidateSize();
      mapRef.current?.fitBounds(getResultBounds(results), { animate: false });
    }, 100);
  };

  // Rerender map whenever search filters change to ensure map displays
  // filtered results correctly
  useEffect(() => {
    rerenderMap();
  }, [results]);

  // invalidate size and rerender map when user switches to map view
  // to ensure it displays correctly despite having been `display: none`
  // https://stackoverflow.com/a/36257493
  const onShowMap = () => {
    logEvent(AnalyticsAction.ToggleResultView, { label: "map" });
    setIsListView(false);
    rerenderMap();
  };

  const onShowList = () => {
    logEvent(AnalyticsAction.ToggleResultView, { label: "list" });
    setIsListView(true);
  };

  const [selectedResult, setSelectedResult] =
    useState<CareProviderSearchResult>();
  return (
    <div
      className="tablet:display-none border-top border-base-lighter padding-x-2 tablet:padding-x-0"
      aria-hidden
    >
      <MobileViewToggle
        isListView={isListView}
        onShowMap={onShowMap}
        onShowList={onShowList}
      />
      <div className={isListView ? "" : "display-none"} key="mobile-list">
        <ResultsList results={results} isMobile />
      </div>
      <div className={isListView ? "display-none" : ""} key="mobile-map">
        <div className="border border-base-lighter">
          <ResultsMap
            bounds={getResultBounds(results)}
            mapRef={mapRef}
            isMobile
            onClick={() => {
              // Clear selected result card when map is
              // clicked anywhere that is not a marker
              setSelectedResult(undefined);
            }}
          >
            {results.map(
              (result) =>
                result.latlng && (
                  <Marker
                    title={result.id}
                    position={result.latlng}
                    icon={
                      selectedResult?.id === result.id
                        ? markerActiveIcon
                        : markerIcon
                    }
                    key={result.id}
                    eventHandlers={{
                      click: () => {
                        setSelectedResult(
                          results.find((r) => r.id === result.id)
                        );
                      },
                    }}
                  />
                )
            )}
          </ResultsMap>
        </div>
        {selectedResult ? (
          <div className="bg-white border border-base-lighter radius-lg padding-2 margin-bottom-1 position-relative top-neg-50px z-top">
            <Grid className="flex-justify-end" row>
              <Grid col="auto">
                <Button
                  type="button"
                  unstyled
                  className="flex-align-center"
                  onClick={() => setSelectedResult(undefined)}
                >
                  {t("common.close")} <Close />
                </Button>
              </Grid>
            </Grid>
            <ResultCard data={selectedResult} />
          </div>
        ) : (
          <Alert
            type="info"
            slim
            headingLevel=""
            className="radius-lg margin-y-2"
          >
            {t(`${T_PREFIX}mapHelper`)}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default MobileResults;
