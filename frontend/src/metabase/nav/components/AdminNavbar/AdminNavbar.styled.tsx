import styled from "styled-components";
import Link from "metabase/components/Link";
import { alpha, color, darken } from "metabase/lib/colors";

export const AdminExitLink = styled(Link)`
  margin-right: 16px;
  border: 1px solid ${alpha("white", 0.2)};
  padding: 12px 18px;
  border-radius: 5px;
  font-weight: 700;
  font-size: 13px;
  transition: all 200ms;
  color: ${color("white")};

  &:hover {
    color: ${color("white")};
    background-color: ${darken(color("accent7"))};
    border-color: ${darken(color("accent7"))};
  }
`;
