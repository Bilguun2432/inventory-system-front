import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkContainer = styled("div")(() => ({
  /* Add any additional styles for the container here */
}));

const LinkStyled = styled(Link)(() => ({
  height: "50px",
  width: "250px",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: "inherit",
}));

const Logo = () => {
  return (
    <LinkContainer>
      <LinkStyled href="/">
        <Image src="/images/logos/logo.png" alt="logo" height={40} width={40} priority />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <h4>Inventory System</h4>
      </LinkStyled>
    </LinkContainer>
  );
};

export default Logo;
