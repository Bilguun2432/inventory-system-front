import { useState, Fragment, SyntheticEvent } from "react";
import ListItemButton, { ListItemButtonProps } from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import navData, { NavItemType } from "@/components/nav/main_nav_data";
import Link from "next/link";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled, useTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import React from "react";

interface NavListItemButtonProps extends ListItemButtonProps {
  subNav?: boolean;
}

const NavAccordion = styled(Accordion, {
  shouldForwardProp: (prop) => true,
})(({ theme }) => ({
  "& .MuiAccordionSummary-root": {
    padding: "0",
    backgroundColor: theme.palette.primary.dark,
    minHeight: "unset",
    "&.Mui-expanded": {
      minHeight: "unset",
    },
    "& .MuiAccordionSummary-expandIconWrapper": {
      color: grey[50],
    },
  },
  "& .MuiAccordionSummary-content": {
    padding: "0",
    margin: "0",
    minHeight: "unset",
    color: grey[50],
  },
  "& .MuiAccordionSummary-content.Mui-expanded": {
    margin: "0",
    minHeight: "unset",
  },
  "& .MuiAccordionDetails-root": {
    paddingTop: "0",
    paddingBottom: "0",
    backgroundColor: theme.palette.primary.main,
  },
}));

const NavListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "subNav",
})<NavListItemButtonProps>(({ theme, subNav }) => ({
  padding: "0",
  color: grey[50],

  "&:hover": {
    color: theme.palette.secondary.main,
  },

  "& .MuiListItemIcon-root": {
    color: "inherit",
    minWidth: "unset",
    padding: `${theme.spacing(1)} ${theme.spacing(1)}`,
  },
  "& .MuiListItemText-root": {
    "& .MuiTypography-root": {},
  },
  ...(subNav && {
    "& .MuiListItemText-root": {
      marginLeft: theme.spacing(3),
      "& .MuiTypography-root": {
        fontSize: "0.95em",
        fontWeight: "400",
      },
    },
  }),
}));

type AccordionEventFunction = (event: SyntheticEvent, isExpanded: boolean) => void;

interface NavItemProps extends NavItemType {
  keyName: string;
}

interface NavGroupProps extends NavItemType {
  keyName: string;
  expandedKey: string;
  handleChange: (s: string) => AccordionEventFunction;
}

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

function NavGroupItem(props: NavItemProps) {
  const { url, title, keyName, Icon } = props;
  return (
    <>
      <Link href={url ?? "#"} key={keyName} style={linkStyle}>
        <NavListItemButton subNav={true}>
          <ListItemText primary={`${title}`} />
        </NavListItemButton>
      </Link>
    </>
  );
}

function NavItem(props: NavItemProps) {
  const { url, title, keyName, Icon } = props;
  return (
    <>
      <Link href={url ?? "#"} key={keyName} style={linkStyle}>
        <NavListItemButton subNav={false}>
          <ListItemIcon>{Icon ?? null}</ListItemIcon>
          <ListItemText primary={title} />
        </NavListItemButton>
      </Link>
    </>
  );
}

function NavGroup(props: NavGroupProps) {
  const { Icon, title, subNav, keyName, expandedKey, handleChange } = props;
  return (
    <NavAccordion
      expanded={keyName === expandedKey}
      onChange={handleChange(keyName)}
      square={true}
      elevation={0}
      // key={keyName}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="small" />}>
        <NavListItemButton subNav={false}>
          <ListItemIcon>{Icon}</ListItemIcon>
          <ListItemText primary={`${title}`} />
        </NavListItemButton>
      </AccordionSummary>

      <AccordionDetails>
        {subNav?.map(function (navItem: NavItemType, index: number) {
          return <NavGroupItem {...navItem} keyName={`${keyName}_${index}`} key={`${keyName}_${index}`} />;
        })}
      </AccordionDetails>
    </NavAccordion>
  );
}

export default function MainNav() {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string>("_none_");

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    console.log({ event, isExpanded });
    setExpanded(isExpanded ? panel : "_none_");
  };

  return (
    <>
      <Fragment>
        <Box
          sx={{
            backgroundColor: theme.palette.primary.dark,
            color: grey[50],
          }}
        >
          {navData.map(function (navItem: NavItemType, index: number) {
            const { url, subNav } = navItem;
            return (
              <Box key={`root_item_${index}`}>
                {!url && subNav && subNav?.length > 0 ? (
                  <>
                    <NavGroup keyName={`nav_group_${index}`} handleChange={handleChange} expandedKey={expanded} {...navItem} />
                  </>
                ) : (
                  <NavItem {...navItem} keyName={`nav_item_${index}`} />
                )}
              </Box>
            );
          })}
        </Box>
      </Fragment>
    </>
  );
}
