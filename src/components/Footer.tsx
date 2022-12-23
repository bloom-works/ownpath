import { Grid, Footer as USWDSFooter, Link } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";
import { ReactComponent as ColoradoBhaLogoWhite } from "../images/logos/colorado_bha_white.svg";
import { ReactComponent as BhaLogo } from "../images/logos/bha.svg";

const betaLabel = (
  <span className="font-body-sm bg-primary-light radius-pill padding-x-1 margin-right-1 text-ink">
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
            <Grid col="auto" className="display-none tablet:display-block">
              <BhaLogo height="40" className="margin-right-2" />
            </Grid>

            <Grid col>
              <h2 className="margin-y-1">{t("privacyCommitmentHeading")}</h2>
              <p className="margin-y-1">{t("privacyCommitment")}</p>
            </Grid>
          </Grid>
        </div>
      }
      secondary={
        <>
          <Grid row gap>
            <Link className="dark-background margin-y-1" href="/faq">
              {t("faqPageHeading")}
            </Link>
            <Link
              className="dark-background margin-y-1"
              href="https://bha.colorado.gov/state-of-colorado-accessibility-statement"
              variant="external"
            >
              {t("accessibilityStatement")}
            </Link>
          </Grid>
          <hr />
          <Grid
            row
            tablet={{ col: true }}
            className="flex-justify-end flex-align-end"
          >
            <Grid col="auto" tablet={{ col: 7 }} className="font-body-2xs">
              <Grid row>
                <p>
                  {betaLabel}
                  {t("betaExplanation")} {t("feedbackPrompt")}{" "}
                  <Link
                    className="dark-background"
                    variant="external"
                    target="_blank "
                    href={t("feedbackLink")}
                  >
                    {t("feedbackCta")}
                  </Link>
                </p>
              </Grid>
            </Grid>
            <Grid
              col="auto"
              tablet={{ col: 5 }}
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
        </>
      }
    />
  );
}

export default Footer;
