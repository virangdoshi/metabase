import React from "react";
import { StarterContent } from "./content/StarterContent";
import { OssContent } from "./content/OssContent";
import { ProContent } from "./content/ProContent";
import { SettingsLicenseContainer } from "./SettingsLicense.styled";
import { EnterpriseContent } from "./content/EnterpriseContent";

export const SettingsLicense = () => {
  return (
    <SettingsLicenseContainer>
      {/* <OssContent /> */}
      {/* <StarterContent /> */}
      <ProContent />
      {/* <EnterpriseContent /> */}
    </SettingsLicenseContainer>
  );
};
