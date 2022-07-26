import { Label, TextInput, ErrorMessage } from "@trussworks/react-uswds";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

type ZipInputProps = {
  zip: string;
  setZip: (zip: string) => void;
  showError?: boolean;
};

function ZipInput({
  children,
  zip,
  setZip,
  showError = false,
}: PropsWithChildren<ZipInputProps>) {
  const { t } = useTranslation();

  return (
    <div className="width-full">
      <Label htmlFor="zip" className="margin-bottom-1">
        {t(`common.zipCode`)}
      </Label>
      <div className="display-flex">
        <TextInput
          className="margin-top-0 tablet:width-15"
          id="zip"
          name="zip"
          type="text"
          maxLength={5}
          value={zip}
          onChange={(evt) => {
            const cleanZipVal = evt.target.value.replace(/[^0-9]+/g, "");
            setZip(cleanZipVal);
          }}
        />
        {children}
      </div>
      {showError && <ErrorMessage>{t("common.zipCodeError")}</ErrorMessage>}
    </div>
  );
}

export default ZipInput;
