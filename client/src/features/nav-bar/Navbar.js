import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import NavTab from "../nav-tab/NavTab";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginRight: theme.spacing(2),
  },
}));

const Navbar = (props) => {
  const { value, onChange } = props;
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" className={classes.title}>
          QuizMe
        </Typography>
        <Tabs value={value} onChange={onChange} className={classes.tabs}>
          <NavTab
            label="Practice"
            value={0}
            onClick={() => history.push("/")}
          />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
