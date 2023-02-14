import { Label, TextInput, ErrorMessage } from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";

type ZipInputProps = {
  zip: string;
  setZip: (zip: string) => void;
  className?: string;
  placeholder?: string;
  showError?: boolean;
  noLabel?: boolean;
  autoFocus?: boolean;
};

function ZipInput({
  zip,
  setZip,
  className,
  placeholder = undefined,
  noLabel = false,
  autoFocus = false,
  showError = false,
}: ZipInputProps) {
  const { t } = useTranslation();

  return (
    <div className={className}>
      <Label htmlFor="zip" className="margin-bottom-1" srOnly={noLabel}>
        {t("locationTitle")}
      </Label>
      <div className="display-flex">
        <TextInput
          className={`margin-top-0 width-full ${
            showError ? "border-2px border-secondary-dark" : ""
          }`}
          id="zip"
          name="zip"
          type="text"
          inputMode="numeric"
          maxLength={5}
          value={zip}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChange={(evt) => {
            const cleanZipVal = evt.target.value.replace(/[^0-9]+/g, "");
            setZip(cleanZipVal);
          }}
        />
      </div>
      {showError && <ErrorMessage>{t("invalidZipcodeError")}</ErrorMessage>}
    </div>
  );
}

export default ZipInput;
