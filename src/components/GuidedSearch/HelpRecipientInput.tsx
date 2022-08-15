import { Fieldset, Radio } from "@trussworks/react-uswds";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

export enum HelpRecipient {
  Yourself = "yourself",
  SomeoneElse = "someone",
}

type HelpRecipientInputProps = {
  helpRecipient: HelpRecipient;
  setHelpRecipient: Dispatch<SetStateAction<HelpRecipient>>;
};

function HelpRecipientInput({
  helpRecipient,
  setHelpRecipient,
}: HelpRecipientInputProps) {
  const { t } = useTranslation();

  // TODO: consolidate getRadio logic? (see DistanceInput)
  const getRadio = (option: HelpRecipient) => (
    <Radio
      id={option}
      name={option}
      label={t(`helpRecipientAnswers${option}`)}
      checked={helpRecipient === option}
      key={option}
      onChange={() => setHelpRecipient(option)}
    />
  );
  return (
    <Fieldset legend={t("helpRecipientQuestion")} legendStyle="large">
      {getRadio(HelpRecipient.Yourself)}
      {getRadio(HelpRecipient.SomeoneElse)}
    </Fieldset>
  );
}

export default HelpRecipientInput;
