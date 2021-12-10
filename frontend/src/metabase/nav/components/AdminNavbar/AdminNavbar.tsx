import React from "react";
import { t } from "ttag";
import { Flex, Box } from "grid-styled";
import { PLUGIN_ADMIN_NAV_ITEMS } from "metabase/plugins";
import MetabaseSettings from "metabase/lib/settings";
import { AdminNavItem } from "./AdminNavItem";
import Link from "metabase/components/Link";
import StoreLink from "../StoreLink";
import LogoIcon from "metabase/components/LogoIcon";
import { AdminExitLink } from "./AdminNavbar.styled";

interface AdminNavbarProps {
  path: string;
}

export const AdminNavbar = ({ path: currentPath }: AdminNavbarProps) => {
  return (
    // NOTE: DO NOT REMOVE `Nav` CLASS FOR NOW, USED BY MODALS, FULLSCREEN DASHBOARD, ETC
    // TODO: hide nav using state in redux instead?
    <nav className={"Nav AdminNav sm-py1"}>
      <div className="flex align-center pr1">
        <Link
          to="/admin"
          data-metabase-event={"Navbar;Logo"}
          className="relative cursor-pointer z2 rounded flex justify-center ml2"
        >
          <Flex
            style={{ minWidth: 32, height: 32 }}
            align="center"
            justify="center"
          >
            <LogoIcon className="text-brand my2" dark />
            <span className="NavItem-text ml2 hide sm-show text-bold">{t`Metabase Admin`}</span>
          </Flex>
        </Link>

        <ul className="sm-ml4 flex flex-full">
          <AdminNavItem
            name={t`Settings`}
            path="/admin/settings"
            currentPath={currentPath}
            key="admin-nav-settings"
          />
          <AdminNavItem
            name={t`People`}
            path="/admin/people"
            currentPath={currentPath}
            key="admin-nav-people"
          />
          <AdminNavItem
            name={t`Data Model`}
            path="/admin/datamodel"
            currentPath={currentPath}
            key="admin-nav-datamodel"
          />
          <AdminNavItem
            name={t`Databases`}
            path="/admin/databases"
            currentPath={currentPath}
            key="admin-nav-databases"
          />
          <AdminNavItem
            name={t`Permissions`}
            path="/admin/permissions"
            currentPath={currentPath}
            key="admin-nav-permissions"
          />
          {PLUGIN_ADMIN_NAV_ITEMS.map(({ name, path }) => (
            <AdminNavItem
              name={name}
              path={path}
              currentPath={currentPath}
              key={`admin-nav-${name}`}
            />
          ))}
          <AdminNavItem
            name={t`Troubleshooting`}
            path="/admin/troubleshooting"
            currentPath={currentPath}
            key="admin-nav-troubleshooting"
          />
        </ul>

        {!MetabaseSettings.isPaidPlan() && <StoreLink />}
        <AdminExitLink
          to="/"
          data-metabase-event="Navbar;Exit Admin"
        >{t`Exit admin`}</AdminExitLink>
      </div>
    </nav>
  );
};
