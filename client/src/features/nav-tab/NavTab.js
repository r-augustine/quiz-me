import React from "react";
import { Tab } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const NavTab = withStyles({
  root: {
    minWidth: 72,
  },
})((props) => <Tab disableRipple {...props} />);

export default NavTab;
