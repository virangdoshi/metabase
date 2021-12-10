import React from "react";
import { t } from "ttag";
import ExternalLink from "metabase/components/ExternalLink";
import MetabaseSettings from "metabase/lib/settings";
import {
  ExporePaidPlansContainer,
  SectionDescription,
  SectionHeader,
  SubHeader,
} from "../SettingsLicense.styled";
import { LicenseWidget } from "../LicenseWidget";
import { ExplorePlansIllustration } from "./ExplorePlansIllustration";

const description = t`Metabase is open source and will be free forever – but by upgrading you can have priority support, more tools to help you share your insights with your teams and powerful options to help you create seamless, interactive data experiences for your customers.`;

export const OssContent = () => {
  return (
    <>
      <SectionHeader>{t`Looking for more?`}</SectionHeader>

      <SectionDescription>{description}</SectionDescription>

      <SubHeader>{t`Want to know more?`}</SubHeader>

      <ExporePaidPlansContainer>
        <ExternalLink
          href={MetabaseSettings.pricingUrl()}
        >{t`Explore our paid plans`}</ExternalLink>

        <ExplorePlansIllustration />
      </ExporePaidPlansContainer>

      <LicenseWidget />
    </>
  );
};
