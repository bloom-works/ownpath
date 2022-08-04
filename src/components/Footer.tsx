import {
  Grid,
  Footer as USWDSFooter,
  Link as ExternalLink,
} from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";
import { ReactComponent as ColoradoBhaLogoWhite } from "../images/logos/colorado_bha_white.svg";
import { ReactComponent as BhaLogo } from "../images/logos/bha.svg";

const T_PREFIX = "components.footer.";
const betaLabel = (
  <span className="font-body-sm bg-primary-light radius-pill padding-x-1 margin-right-1">
    BETA
  </span>
);
function Footer() {
  const { t } = useTranslation();
  return (
    <USWDSFooter
      className="border-top border-base-lightest"
      primary={
        <div className="padding-x-4 display-flex flex-row">
          <Grid row className="flex-align-center padding-y-2">
            <Grid col="auto">
              <BhaLogo height="40" />
            </Grid>

            <Grid col className="margin-left-2">
              <h2 className="margin-y-1">
                {t("components.footer.ourCommitment")}
              </h2>
              <p className="margin-y-1">
                {t("components.footer.privacyPolicy")}
              </p>
            </Grid>
          </Grid>
        </div>
      }
      secondary={
        <Grid
          row
          tablet={{ col: true }}
          className="flex-justify-end flex-align-end"
        >
          <Grid col="auto" tablet={{ col: 6 }} className="font-body-2xs">
            <Grid row>
              <p>
                {betaLabel}
                {t(`${T_PREFIX}betaExplanation`)}
              </p>
            </Grid>
            <Grid row className="flex-justify">
              {t(`${T_PREFIX}feedbackPrompt`)}
              <ExternalLink
                className="dark-background"
                variant="external"
                target="_blank "
                href={t("common.feedbackUrl")}
              >
                {t(`${T_PREFIX}feedbackCta`)}
              </ExternalLink>
            </Grid>
          </Grid>
          <Grid
            col="auto"
            tablet={{ col: 6 }}
            className="margin-top-2 tablet:margin-top-0"
          >
            <Grid row className="flex-justify-end">
              <ColoradoBhaLogoWhite height={30} />
            </Grid>
            <Grid row className="flex-justify-end margin-top-2">
              © 2022
            </Grid>
          </Grid>
        </Grid>
      }
    />
  );
}

export default Footer;
