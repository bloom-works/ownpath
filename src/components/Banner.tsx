import styled from "styled-components";
import { Dropdown, Grid, Label, Link } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

import { ReactComponent as Globe } from "../images/globe.svg";
import caretDownURL from "../images/caret-down.svg";

const StyledDropdown = styled(Dropdown)`
  border: none;
  background: inherit;
  width: fit-content;
  padding-right: 1rem;
  margin-top: 0;
  font-size: 0.8rem;
  color: white;

  background-image: url(${caretDownURL});
  background-repeat: no-repeat;
  background-position: right;
  background-size: 15%;
`;

function Banner() {
  const { t, i18n } = useTranslation();
  const T_PREFIX = "components.banner.";

  return (
    <div className="Banner usa-dark-background font-body-3xs">
      <section aria-label="Immediate help">
        <Grid row className="flex-justify flex-align-center margin-x-2">
          <Grid col>
            <Grid row>
              <Grid col="auto" className="margin-right-05">
                <span>{t(`${T_PREFIX}immediateHelp`)}</span>
              </Grid>
              <Grid col="auto">
                <Link href="tel:+18444938255">
                  <span className="text-no-wrap">1-844-493-TALK (8255).</span>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid col="auto">
            <Grid row className="flex-justify-end flex-align-center">
              <Globe height={15} fill="white" />
              <Label
                htmlFor="change-language"
                className="display-none tablet:display-flex margin-top-0 margin-left-1 font-body-3xs text-white"
              >
                {t(`${T_PREFIX}changeLanguage`)}
              </Label>
              <StyledDropdown
                name="change-language"
                id="change-language"
                defaultValue={i18n.language}
                onChange={(evt) => i18n.changeLanguage(evt.target.value)}
              >
                <option className="usa-dark-background" value="en">
                  English
                </option>
                <option className="usa-dark-background" value="es">
                  Español
                </option>
              </StyledDropdown>
            </Grid>
          </Grid>
        </Grid>
      </section>
    </div>
  );
}

export default Banner;
