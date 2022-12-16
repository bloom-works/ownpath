import { Grid } from "@trussworks/react-uswds";
import { Marker } from "react-leaflet";
import { Map as LeafletMap } from "leaflet";
import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { logEvent, AnalyticsAction } from "../../utils/analytics";
import ResultsList from "../../components/Search/ResultsList";
import ResultsMap from "../../components/Search/ResultsMap";
import { CareProviderSearchResult, SearchFilters } from "../../types";
import { getMapMarker, getResultBounds, rerenderMap } from "../../utils";
import ResultMapTelehealthToggleButton from "../../components/Search/ResultMapTelehealthToggleButton";

type DesktopResultsProps = {
  results: CareProviderSearchResult[];
  filters: SearchFilters;
  setFilters: Dispatch<SetStateAction<SearchFilters>>;
};
/**
 * The side-by-side list + map view for desktop or tablet,
 * which is visually hidden in mobile via CSS, but should still
 * be picked up by screen readers
 */
function DesktopResults({ results, filters, setFilters }: DesktopResultsProps) {
  const [selectedResultId, setSelectedResultId] = useState<string>("");
  const mapRef = useRef<LeafletMap>(null);

  // Rerender map and reset scroll list to top
  // whenever search filters change to ensure
  // filtered results are displayed correctly
  useEffect(() => {
    rerenderMap(mapRef, results);
    const scrollList = document.getElementById("scroll-list");
    if (scrollList) scrollList.scrollTop = 0;
  }, [mapRef, results]);

  return (
    <div className="display-none tablet:display-block">
      <Grid
        id="scroll-list"
        row
        className="border-top border-base-lighter overflow-x-hidden"
      >
        <Grid
          tablet={{ col: 7 }}
          className="height-viewport"
          key="desktop-list"
          id="desktop-list"
        >
          <ResultsList results={results} selectedResultId={selectedResultId} />
        </Grid>
        <Grid
          tablet={{ col: 5 }}
          key="desktop-map"
          className="position-sticky top-0"
        >
          <ResultsMap bounds={getResultBounds(results)} mapRef={mapRef}>
            {results.map(
              (result) =>
                result.latlng && (
                  <Marker
                    position={result.latlng}
                    icon={getMapMarker(result, selectedResultId)}
                    zIndexOffset={selectedResultId === result.id ? 1000 : 1}
                    keyboard={false}
                    key={result.id}
                    eventHandlers={{
                      click: () => {
                        logEvent(AnalyticsAction.ClickMapMarker, {});
                        setSelectedResultId(result.id);
                        document.getElementById(result.id)?.scrollIntoView();
                      },
                    }}
                  />
                )
            )}
            <ResultMapTelehealthToggleButton
              filters={filters}
              setFilters={setFilters}
            />
          </ResultsMap>
        </Grid>
      </Grid>
    </div>
  );
}

export default DesktopResults;
