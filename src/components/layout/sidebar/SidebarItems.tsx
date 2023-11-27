import React from "react";
import MenuItems from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { useSession } from "next-auth/react";
import { useDetailEmailSwr } from "./api";

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const pathname = usePathname();
  const pathDirect = pathname;
  const { data } = useSession();

  const { data: authUser } = useDetailEmailSwr(data?.user?.email);

  const menuGroupToDisplay = authUser?.authRole?.name === "Admin" ? "Admin" : "Employee";

  return (
    <Box sx={{ px: 2 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {MenuItems.filter((group) => group.subheader === menuGroupToDisplay).map((group) => (
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
