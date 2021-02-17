import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Typography, Box } from "@material-ui/core";

const footerStyles = makeStyles({
  container: {
    background: "#3f51b5 0% 0% no-repeat padding-box",
    opacity: 1,
    width: "100%",
    position: "fixed",
    display: "flex",
    bottom: 0
  },
  copyrightText: {
    fontSize: "0.9rem",
    color: "#ffffff"
  },
  footerText: {
    fontSize: "1rem",
    color: "#ffffff",
    marginLeft: "3rem"
  },
  link: {
    "& a": {
      color: "inherit",
      textDecoration: "none !important"
    }
  }
});

const Footer = () => {
  const footerClasses = footerStyles();

  return (
    <Box className={footerClasses.container}>
      <Toolbar className={footerClasses.link}>
        <Typography variant="h6" className={footerClasses.footerText}>
          © Copyright 2021 Great Software Laboratory. All rights reserved.
        </Typography>
        {/* <Typography variant="h6" className={footerClasses.footerText}>
          Terms of use
        </Typography>
        <Typography variant="h6" className={footerClasses.footerText}>
          Accessibility
        </Typography>
        <Typography variant="h6" className={footerClasses.footerText}>
          Cookie preferences
        </Typography> */}
      </Toolbar>
    </Box>
  );
};

export default Footer;
