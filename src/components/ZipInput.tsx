import { Label, TextInput, ErrorMessage } from "@trussworks/react-uswds";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

type ZipInputProps = {
  zip: string;
  setZip: (zip: string) => void;
  showError?: boolean;
  noLabel?: boolean;
  autoFocus?: boolean;
};

function ZipInput({
  children,
  zip,
  setZip,
  noLabel = false,
  autoFocus = false,
  showError = false,
}: PropsWithChildren<ZipInputProps>) {
  const { t } = useTranslation();

  return (
    <div className="width-full">
      {!noLabel && (
        <Label htmlFor="zip" className="margin-bottom-1">
          {t("locationTitle")}
        </Label>
      )}
      <div className="display-flex">
        <TextInput
          className="margin-top-0 tablet:width-15"
          id="zip"
          name="zip"
          type="text"
          maxLength={5}
          value={zip}
          autoFocus={autoFocus}
          onChange={(evt) => {
            const cleanZipVal = evt.target.value.replace(/[^0-9]+/g, "");
            setZip(cleanZipVal);
          }}
        />
        {children}
      </div>
      {showError && <ErrorMessage>{t("zipCodeError")}</ErrorMessage>}
    </div>
  );
}

export default ZipInput;
