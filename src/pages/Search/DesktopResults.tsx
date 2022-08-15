import { Grid } from "@trussworks/react-uswds";
import { Marker } from "react-leaflet";
import { Map as LeafletMap } from "leaflet";
import { useState, useRef, useEffect } from "react";
import { logEvent, AnalyticsAction } from "../../analytics";
import {
  markerActiveIcon,
  markerIcon,
  rerenderMap,
} from "../../components/Map";
import ResultsList from "../../components/Search/ResultsList";
import ResultsMap from "../../components/Search/ResultsMap";
import { CareProviderSearchResult } from "../../types";
import { getResultBounds } from "../../utils";

/**
 * The side-by-side list + map view for desktop or tablet,
 * which is visually hidden in mobile via CSS, but should still
 * be picked up by screen readers
 */
function DesktopResults({ results }: { results: CareProviderSearchResult[] }) {
  const [selectedResultId, setSelectedResultId] = useState<string>("");
  const mapRef = useRef<LeafletMap>(null);

  // Rerender map whenever search filters change to ensure map displays
  // filtered results correctly
  useEffect(() => {
    rerenderMap(mapRef, results);
  }, [mapRef, results]);

  // Whenever the popstate event is fired (active history, back button) it fires off a explicit
  // history.back and a callback of the popstate. The popstate is called this way because moving through history
  // explicitly this way calls popstate again, this normalizes the behavior as we would expect it
  useEffect(() => {
    window.onpopstate = () =>  {
      window.onpopstate = () => {}
      window.history.back();
    }
  });

  return (
    <div className="display-none tablet:display-block padding-x-4">
      <Grid row className="border-top border-base-lighter overflow-x-hidden">
        <Grid
          tablet={{ col: 7 }}
          className="height-viewport"
          key="desktop-list"
        >
          <ResultsList results={results} selectedResultId={selectedResultId} />
        </Grid>
        <Grid
          tablet={{ col: 5 }}
          key="desktop-map"
          className="position-sticky top-0"
        >
          <div className="border-right border-left border-base-lighter">
            <ResultsMap bounds={getResultBounds(results)} mapRef={mapRef}>
              {results.map(
                (result) =>
                  result.latlng && (
                    <Marker
                      position={result.latlng}
                      icon={
                        selectedResultId === result.id
                          ? markerActiveIcon
                          : markerIcon
                      }
                      zIndexOffset={
                        selectedResultId === result.id ? 1000 : undefined
                      }
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
            </ResultsMap>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default DesktopResults;
