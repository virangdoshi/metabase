import TextInput from "metabase/components/TextInput";
import styled from "styled-components";

export const LicenseInputContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

export const LicenseInput = styled(TextInput)`
  flex-grow: 1;
  margin-right: 8px;
`;
