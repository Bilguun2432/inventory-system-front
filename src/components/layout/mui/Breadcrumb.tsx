"use client";

import Link from "next/link";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Box from "@mui/material/Box";
import Chip, { ChipProps } from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";

export interface CrumbProps extends ChipProps {
  url?: string;
  title?: string;
}

const Crumb = styled(Chip)(({ theme }) => {
  const backgroundColor = theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[800];
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
});

export default function Breadcrumb({ paths }: { paths: CrumbProps[] }) {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link href={"/"}>
          <Crumb label="Нүүр" icon={<HomeIcon fontSize="small" />} />
        </Link>

        {paths?.map((path: CrumbProps, index: number) => {
          return (
            <Box key={`bread_crumbs_${index}`} sx={{ display: "inline-block" }}>
              {path.url ? (
                <Link href={path.url}>
                  <Crumb label={path.title} />
                </Link>
              ) : (
                <Crumb label={path.title} />
              )}
            </Box>
          );
        })}
      </Breadcrumbs>
    </>
  );
}
