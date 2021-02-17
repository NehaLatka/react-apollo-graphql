import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  IconButton,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { Cancel as CancelIcon } from "@material-ui/icons";
import TableChartIcon from "@material-ui/icons/TableChart";
import BarChartIcon from "@material-ui/icons/BarChart";
import ListIcon from "@material-ui/icons/List";
import HomeIcon from '@material-ui/icons/Home';
import TimelineIcon from '@material-ui/icons/Timeline';

const useStyles = makeStyles({
  title: {
    marginLeft: "0.6rem",
    fontSize: "2rem",
    color: "#5A5A5A",
    fontWeight: 600
  },
  closeIcon: {
    width: "1.8rem",
    height: "1.8rem"
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  navLink: {
    "& a": {
      color: "inherit",
      textDecoration: "none !important"
    }
  },
  container: {
    border: "1px solid #707070"
  },
  menuIcon: {
    minWidth: "2.5rem"
  },
  menuText: {
    fontSize: "1.25rem",
    lineHeight: "1.3rem",
    color: "#5A5A5A"
  }
});

export default function SwipeableTemporaryDrawer(props) {
  const classes = useStyles();
  const navList = useMemo(() => {
    return [
      { title: "Home", path: "/", icon: <HomeIcon />, isDisplay: true },
      {
        title: "Prediction",
        path: "prediction",
        icon: <TimelineIcon />,
        isDisplay: true
      }
      // {
      //   title: "Form",
      //   path: "form",
      //   icon: <ListIcon />,
      //   isDisplay: true
      // }
    ];
  }, []);
  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={props.toggleDrawer(false)}
      onKeyDown={props.toggleDrawer(false)}
    >
      <List>
        {navList.map(
          (item) =>
            item.isDisplay && (
              <li
                className={classes.navLink}
                key={item.title}
                onClick={() => {
                  window.location.href = `${item.path}`;
                }}
              >
                <ListItem button>
                  <ListItemIcon className={classes.menuIcon}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    classes={{ primary: classes.menuText }}
                  />
                </ListItem>
              </li>
            )
        )}
      </List>
    </div>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor="left"
        open={props.drawerState}
        onClose={props.toggleDrawer(false)}
        onOpen={props.toggleDrawer(true)}
      >
        <Box display="flex" alignItems="center" p="0.3rem">
          <Box p="0.3rem" flexGrow={1}>
            <Typography variant="h4" className={classes.title}>
              HG App
            </Typography>
          </Box>
          <Box p="0.3rem">
            <IconButton onClick={props.toggleDrawer(false)}>
              <CancelIcon className={classes.closeIcon} />
            </IconButton>
          </Box>
        </Box>
        {list()}
      </SwipeableDrawer>
    </div>
  );
}
