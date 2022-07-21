import ReactGA from "react-ga4";

const initializeGA = () => {
  ReactGA.initialize("G-MLZGY314R9", {
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
  UpdateFilter = "Update filter",
  ApplyFilter = "Apply filter",
  ToggleResultView = "Toggle result view",
  ClickMapMarker = "Click map marker",
}

type AnalyticsEventProperties = {
  step?: number;
  label?: string;
  filter_type?: string;
  filter_value?: string;
};
