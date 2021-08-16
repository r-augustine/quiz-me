import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Header from "../header/Header";

const TabPanel = (props) => {
  const { children, value, index, history, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexBasis: "48%",
    marginBottom: "24px",
  },
  pageHeader: {
    background: "#ffffff",
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  cardHeader: {
    marginBottom: "0.6em",
  },
  cardBody: {
    marginBottom: "1.4em",
  },
  cardButton: {
    minWidth: "240px",
    padding: "10px",
  },
  cardGroup: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  section: {
    paddingTop: "24px",
    paddingBottom: "24px",
  },
  paper: {
    padding: theme.spacing(2),
    cursor: "pointer",
  },
  routerLink: {
    textDecoration: "none",
  },
}));

const Practice = (props) => {
  const { index, value, history } = props;
  const classes = useStyles();

  return (
    <TabPanel value={value} index={index}>
      <Header
        title="dashboard"
        links={[
          {
            key: "navlink-dashboard",
            text: "Practice",
            to: "/",
            color: "inherited",
          },
        ]}
      />
      <Container className={classes.section}>
        <Typography variant="h6" gutterBottom>
          Skills
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6}>
            <Paper
              className={classes.paper}
              onClick={() => {
                history.push("/domains/mathematics");
              }}
            >
              <Typography variant="h5" className={classes.cardHeader}>
                Mathematics
              </Typography>
              <Typography
                variant="body2"
                className={classes.cardBody}
                gutterBottom
              >
                Curated quizzes to help you prepare for your upcoming exams.
              </Typography>
              <RouterLink
                to="/domains/mathematics"
                className={classes.routerLink}
              >
                <Button
                  className={classes.cardButton}
                  variant="contained"
                  size="large"
                  disableElevation
                >
                  Challenge
                </Button>
              </RouterLink>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Paper
              className={classes.paper}
              onClick={() => {
                history.push("/domains/english");
              }}
            >
              <Typography variant="h5" className={classes.cardHeader}>
                English
              </Typography>
              <Typography
                variant="body2"
                className={classes.cardBody}
                gutterBottom
              >
                Curated quizzes to help you prepare for your upcoming exams.
              </Typography>
              <Button
                className={classes.cardButton}
                variant="contained"
                size="large"
                disableElevation
              >
                Challenge
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </TabPanel>
  );
};

export default Practice;
