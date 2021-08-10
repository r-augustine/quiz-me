import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import NavTab from "../nav-tab/NavTab";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginRight: theme.spacing(2),
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [value, setValue] = useState("practice");
  const handleChange = (event, value) => {
    setValue(value);
  };
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" className={classes.title}>
          QuizMe
        </Typography>
        <Tabs value={value} onChange={handleChange} className={classes.tabs}>
          <NavTab label="Practice" value="practice" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
