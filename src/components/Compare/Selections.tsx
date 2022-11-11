import { Grid, Button } from "@trussworks/react-uswds";
import { ReactComponent as Close } from "../../images/close.svg";
import { ReactComponent as CaretDown } from "../../images/caret-down.svg";
import { useState, useContext } from "react";
import { CareProvider } from "../../types";
import { useTranslation } from "react-i18next";
import { CompareContext } from "../../pages/Search/Search";

function Selections() {
  const { providers, setProviders } = useContext(CompareContext);
  const [showSelections, setShowSelections] = useState(true);
  const { t } = useTranslation();
  return (
    <Grid row>
      {showSelections && (
        <>
          <Selection
            provider={providers[0]}
            clearFunc={() => {
              const _p = [...providers];
              setProviders(_p.slice(1));
            }}
          />
          <Selection
            provider={providers[1]}
            clearFunc={() => {
              const _p = [...providers];
              setProviders(_p.slice(0, 1));
            }}
          />
        </>
      )}

      <button
        className="tablet:display-none margin-0 bg-white text-black padding-x-1 padding-y-2 radius-lg width-full border-0"
        onClick={() => setShowSelections(!showSelections)}
      >
        {t("showCompareSelections", {
          count: providers.length,
        })}
        <CaretDown
          height={7}
          fill="black"
          className={`margin-left-2 ${!showSelections ? "rotate-180" : ""}`}
        />
      </button>
    </Grid>
  );
}

function Selection({
  provider,
  clearFunc,
}: {
  provider?: CareProvider;
  clearFunc: () => void;
}) {
  const { t } = useTranslation();
  return (
    <Grid
      tablet={{ col: true }}
      className={`radius-lg tablet:margin-right-1 padding-y-1 padding-x-2 margin-bottom-1 tablet:margin-bottom-0 ${
        !provider
          ? "bg-black opacity-30 display-none tablet:display-block"
          : "bg-white"
      }`}
    >
      {provider && (
        <div className="display-flex flex-align-center flex-justify">
          {provider.name}
          <Button
            type="button"
            unstyled
            className="width-auto data-icon"
            onClick={clearFunc}
          >
            <Close title={`${t("clear")} ${provider.name}`} />
          </Button>
        </div>
      )}
    </Grid>
  );
}

export default Selections;
