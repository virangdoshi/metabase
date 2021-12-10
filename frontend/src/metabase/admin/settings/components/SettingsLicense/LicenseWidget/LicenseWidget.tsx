import React, { useState } from "react";
import { t } from "ttag";
import Button from "metabase/components/Button";
import { SectionDescription, SectionHeader } from "../SettingsLicense.styled";
import { LicenseInput, LicenseInputContainer } from "./LicenseWidget.styled";
import ExternalLink from "metabase/components/ExternalLink";
import { useLicense } from "./use-license";
import LoadingSpinner from "metabase/components/LoadingSpinner";

const getDescription = (hasLicense: boolean, isValid: boolean) => {
  if (!hasLicense) {
    return t`Bought a license to unlock advanced functionality? Please enter it below.`;
  }

  if (!isValid) {
    return (
      <>
        Your license isn’t valid anymore. If you have a new license, please
        enter it below, otherwise please contact{" "}
        <ExternalLink href="mailto:support@metabase.com">
          support@metabase.com
        </ExternalLink>
      </>
    );
  }

  return t`Your license is active! Hope you’re enjoying it.`;
};

export const LicenseWidget = () => {
  const {
    updateLicense,
    error,
    loading,
    isValid,
    currentLicense,
  } = useLicense();

  const [value, setValue] = useState(currentLicense);

  const handleChange = (value: string) => setValue(value);

  const handleActivate = () => {
    updateLicense(value);
  };

  return (
    <>
      <SectionHeader>License</SectionHeader>

      {loading && <LoadingSpinner />}

      {!loading && (
        <>
          <SectionDescription>
            {getDescription(currentLicense, isValid)}
          </SectionDescription>

          <LicenseInputContainer>
            <LicenseInput
              disabled={isValid}
              onChange={handleChange}
              value={value}
              placeholder={"XXXX-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX"}
            />
            {!isValid && (
              <Button className="px2" onClick={handleActivate}>
                Activate
              </Button>
            )}
          </LicenseInputContainer>

          {error && <div>{error}</div>}
        </>
      )}
    </>
  );
};
