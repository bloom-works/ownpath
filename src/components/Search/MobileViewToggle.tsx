import { ButtonGroup, Button } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

export type MobileViewToggleProps = {
  isListView: boolean;
  onShowMap: () => void;
  onShowList: () => void;
};

function MobileViewToggle({
  isListView,
  onShowMap,
  onShowList,
}: MobileViewToggleProps) {
  const { t } = useTranslation();
  return (
    <div className="margin-y-2">
      <ButtonGroup type="segmented">
        <Button
          type="button"
          base={isListView}
          outline={!isListView}
          onClick={onShowList}
          className="radius-pill"
        >
          {t("listView")}
        </Button>
        <Button
          type="button"
          base={!isListView}
          outline={isListView}
          onClick={onShowMap}
          className="radius-pill"
        >
          {t("mapView")}
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default MobileViewToggle;
