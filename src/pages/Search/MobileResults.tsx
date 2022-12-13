import { Grid, Button, Alert } from "@trussworks/react-uswds";
import { Marker } from "react-leaflet";
import { Map as LeafletMap } from "leaflet";
import { useState, useRef, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { logEvent, AnalyticsAction } from "../../utils/analytics";
import MobileViewToggle from "../../components/Search/MobileViewToggle";
import ResultCard from "../../components/Search/ResultCard";
import ResultsList from "../../components/Search/ResultsList";
import ResultsMap from "../../components/Search/ResultsMap";
import { CareProviderSearchResult } from "../../types";
import { getMapMarker, getResultBounds, rerenderMap } from "../../utils";
import { ReactComponent as Close } from "../../images/close.svg";
import { PaginationContext } from "./Search";

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

  // Rerender map whenever search filters change to ensure map displays
  // filtered results correctly
  useEffect(() => {
    rerenderMap(mapRef, results);
  }, [results]);

  // invalidate size and rerender map when user switches to map view
  // to ensure it displays correctly despite having been `display: none`
  // https://stackoverflow.com/a/36257493
  const onShowMap = () => {
    logEvent(AnalyticsAction.ToggleResultView, { label: "map" });
    setIsListView(false);
    rerenderMap(mapRef, results);
  };

  const onShowList = () => {
    logEvent(AnalyticsAction.ToggleResultView, { label: "list" });
    setIsListView(true);
  };

  const { paginationConfig } = useContext(PaginationContext);
  const resultsSlice = results
    .slice((paginationConfig.currentPage - 1) * paginationConfig.pageSize)
    .slice(0, paginationConfig.pageSize);

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
        <ResultsMap
          bounds={getResultBounds(resultsSlice)}
          mapRef={mapRef}
          isMobile
          onClick={() => {
            // Clear selected result card when map is
            // clicked anywhere that is not a marker
            setSelectedResult(undefined);
          }}
        >
          {resultsSlice.map(
            (result) =>
              result.latlng && (
                <Marker
                  title={result.id}
                  position={result.latlng}
                  icon={getMapMarker(result, selectedResult?.id)}
                  keyboard={false}
                  zIndexOffset={selectedResult?.id === result.id ? 1000 : 1}
                  key={result.id}
                  eventHandlers={{
                    click: () => {
                      logEvent(AnalyticsAction.ClickMapMarker, {});
                      setSelectedResult(
                        results.find((r) => r.id === result.id)
                      );
                    },
                  }}
                />
              )
          )}
        </ResultsMap>
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
                  {t("close")} <Close />
                </Button>
              </Grid>
            </Grid>
            <ResultCard data={selectedResult} />
          </div>
        ) : (
          <Alert
            type="info"
            slim
            headingLevel="h5"
            className="radius-lg margin-y-2"
          >
            {t("mapHelper")}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default MobileResults;
