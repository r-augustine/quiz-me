import React from "react";
import Box from "@material-ui/core/Box";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { NavLink } from "react-router-dom";
import useStyles from "./styles";

const Header = (props) => {
  const { title, links } = props;
  const classes = useStyles();
  return (
    <Box p={3} className={classes.header}>
      <Container disableGutters={true}>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNextIcon fontSize="small" />}
        >
          {links.map(({ to, text, ...rest }) => (
            <Link
              component={NavLink}
              to={to}
              {...rest}
              className={classes.link}
            >
              {text}
            </Link>
          ))}
        </Breadcrumbs>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
      </Container>
    </Box>
  );
};

export default Header;
