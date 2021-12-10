import React from "react";
import { t, jt } from "ttag";
import { SectionDescription, SectionHeader } from "../SettingsLicense.styled";
import ExternalLink from "metabase/components/ExternalLink";
import { LicenseWidget } from "../LicenseWidget/LicenseWidget";

export const EnterpriseContent = () => {
  return (
    <>
      <SectionHeader>{t`Billing`}</SectionHeader>

      <SectionDescription>
        {jt`To manage your billing preferences, please email ${(
          <ExternalLink href="mailto:billing@metabase.com">
            billing@metabase.com
          </ExternalLink>
        )}`}
        <LicenseWidget />
      </SectionDescription>
    </>
  );
};
