"use client";

import * as React from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "@mui/material";

const CustomizedBreadcrumbs = () => {
  const [pageUrl, setPageUrl] = React.useState<string>("");

  React.useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  let currentLink: any = "";

  const crumbs = pageUrl
    .slice(21)
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink = currentLink + `/${crumb}`;
      return (
        <div key={"breadcrumb" + crumb} className="crumb">
          <Link
            key={"breadcrumbs" + crumb}
            underline="none"
            href={currentLink}
            style={{ color: "black" }}
          >
            {crumb}
          </Link>
        </div>
      );
    });

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          component="a"
          href="/"
          label="Home"
          icon={<HomeIcon fontSize="small" />}
        />
        {crumbs?.map((el, index) => {
          return (
            <StyledBreadcrumb
              key={"styledBread" + index}
              label={crumbs[index]}
            />
          );
        })}
      </Breadcrumbs>
    </div>
  );
};
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip;

export default CustomizedBreadcrumbs;
