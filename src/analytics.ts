import ReactGA from "react-ga4";

const initializeGA = () => {
  ReactGA.initialize("G-9L5WD4V6NV", {
    gaOptions: { anonymize_ip: true },
    gtagOptions: { anonymize_ip: true },
  });
};

export const logPageView = () => {
  initializeGA();
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

export const logEvent = (
  action: AnalyticsAction,
  properties: AnalyticsEventProperties
) => {
  initializeGA();
  ReactGA.event(action, properties);
};

export enum AnalyticsAction {
  CompleteGuidedSearchQuestion = "Complete guided search question",
  CompleteGuidedSearch = "Complete guided search",
  CompleteZipSearch = "Complete zip search",
  UpdateFilter = "Update filter",
  ApplyFilter = "Apply filter",
  ToggleResultView = "Toggle result view",
  ClickMapMarker = "Click map marker",
  SearchError = "Search error",
  ViewSearchResults = "View search results",
}

type AnalyticsEventProperties = {
  count?: number;
  filter_count?: number;
  filter_type?: string;
  filter_value?: string;
  label?: string;
  search?: string;
  step?: number;
};
