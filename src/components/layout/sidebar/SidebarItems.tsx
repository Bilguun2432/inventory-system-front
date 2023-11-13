import React from "react";
import Menuitems from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const pathname = usePathname();
  const pathDirect = pathname;

  return (
    <Box sx={{ px: 2 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {Menuitems.map((group) => (
          <React.Fragment key={group.subheader}>
            <NavGroup item={group} />
            {group.items.map((item) => (
              <NavItem item={item} key={item.id} pathDirect={pathDirect} onClick={toggleMobileSidebar} />
            ))}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default SidebarItems;
