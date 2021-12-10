import { t } from "ttag";
import { useCallback, useEffect, useState } from "react";
import { SettingsApi, StoreApi } from "metabase/services";
import MetabaseSettings from "metabase/lib/settings";

type LicenseType = "starter" | "pro" | "enterprise";

export const useLicense = () => {
  const currentLicense = MetabaseSettings.license();
  const shouldFetchStatus = currentLicense != null;

  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(shouldFetchStatus);
  const [isValid, setIsValid] = useState(false);
  const [licenseType, setLicenseType] = useState<LicenseType | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!currentLicense) {
        return;
      }

      try {
        const status = await StoreApi.tokenStatus();
        setIsValid(status.valid);

        // FIXME: get it from the response once the BE is ready
        setLicenseType("enterprise");
      } catch (e) {
        setIsValid(false);
        const errorMessage =
          (e as any)?.data?.["error-details"] ?? t`Something went wrong`;
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const updateLicense = useCallback(async (license: string) => {
    try {
      setLoading(true);
      setError(null);
      await SettingsApi.put({ key: "premium-embedding-token", license });
    } catch (e) {
      const errorMessage =
        (e as any)?.data?.["error-details"] ?? t`Something went wrong`;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    updateLicense,
    error,
    loading,
    isValid,
    currentLicense,
    licenseType,
  };
};
