import { ButtonGroup, Button } from "@trussworks/react-uswds";

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
          List view
        </Button>
        <Button
          type="button"
          base={!isListView}
          outline={isListView}
          onClick={onShowMap}
          className="radius-pill"
        >
          Map view
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default MobileViewToggle;
