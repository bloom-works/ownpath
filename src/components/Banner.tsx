import styled from "styled-components";
import { Dropdown, Grid, Label } from "@trussworks/react-uswds";
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

  return (
    <div className="Banner usa-dark-background font-body-3xs">
      <Grid row className="flex-justify-end">
        <Grid col="auto" className="padding-x-2">
          <Grid row className="flex-justify-end flex-align-center">
            <Globe height={15} fill="white" />
            <Label
              htmlFor="change-language"
              className="display-none tablet:display-flex margin-top-0 margin-left-1 font-body-3xs text-white"
            >
              {t("changeLanguage")}
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
    </div>
  );
}

export default Banner;
