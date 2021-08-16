import React, { useState } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./features/nav-bar/Navbar";
import Practice from "./features/practice/Practice";
import Domain from "./features/domain/Domain";

const useStyles = makeStyles({
  root: {
    background: "#f3f7f7",
  },
});

function App() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const onNavChange = (event, value) => {
    setValue(value);
  };
  return (
    <Router className={classes.root}>
      <Navbar value={value} onChange={onNavChange} />
      <Switch>
        <Route exact path="/" component={Practice} index={0} value={value} />
        <Route path="/domains/:domain" component={Domain} />
      </Switch>
    </Router>
  );
}

export default App;
