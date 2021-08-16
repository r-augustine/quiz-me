import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Breadcrumbs,
  Typography,
  Link,
  Grid,
  Paper,
  List,
  ListItem,
  Divider,
  FormControl,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Fade,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Header from "../header/Header";
import { fetchQuestions, resetDomainState } from "./domainSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexBasis: "48%",
    marginBottom: theme.spacing(2),
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium,
    textTransform: "capitalize",
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

  content: {
    paddingTop: "24px",
    paddingBottom: "24px",
  },

  paper: {
    padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`,
    "&:hover": {
      background: theme.palette.grey[50],
    },
    "& > h5": {
      paddingBottom: theme.spacing(0),
      fontWeight: theme.typography.fontWeightMedium,
    },
  },

  list: {
    background: theme.palette.background.paper,
  },
  shadow: {
    boxShadow:
      "rgb(0 0 0 / 20%) 0px 0px 1px -2px, rgb(0 0 0 / 14%) 0px 0px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px;",
  },
  formGroupDivider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  formControlLabel: {
    "& > span:first-of-type": {
      paddingTop: theme.spacing(0.125),
    },
  },
  aside: {},
  ctaButton: {
    [theme.breakpoints.down("sm")]: {
      flexBasis: "100%",
    },
  },
  ctaWrapper: {
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-start",
      paddingTop: theme.spacing(1.2),
    },
    [theme.breakpoints.up("sm")]: {
      justifyContent: "flex-end",
    },
  },
}));

const Doman = () => {
  const dispatch = useDispatch();
  let { domain } = useParams();
  const { questions, loading } = useSelector((state) => state.domain);

  console.log(domain);
  const classes = useStyles();

  useEffect(() => {
    // fetch questions when the component renders
    const promise = dispatch(fetchQuestions(domain));
    return () => {
      // cancel the request if the component unmounts before resolving the request
      promise.abort();

      // clear the state of the reducer when the component is unmounted
      dispatch(resetDomainState());
    };
  }, [domain]);

  return (
    <>
      <Box>
        <Header
          title={domain}
          links={[
            {
              key: "navlink-dashboard",
              text: "Practice",
              to: "/",
              color: "inherited",
            },
            {
              key: "navlink-mathematics",
              text: "Mathematics",
              to: "/domains/mathematics",
              color: "inherited",
            },
          ]}
        />
        <Container className={classes.content}>
          <Grid container>
            <Grid item xs={12} sm={8}>
              <Grid container direction="column">
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Fade
                    in={loading === "pending"}
                    style={{
                      transitionDelay: loading === "pending" ? "100ms" : "0ms",
                    }}
                    unmountOnExit
                  >
                    <CircularProgress />
                  </Fade>
                </Box>
                {loading === "idle" &&
                  questions.map(({ title, difficulty, id }) => (
                    <Grid item xs={12} key={id}>
                      <Paper
                        elevation={1}
                        className={classes.paper}
                        square={true}
                        onClick={() => {
                          console.log("go to question");
                        }}
                      >
                        <Grid container>
                          <Grid item xs={12} sm={12} md={7}>
                            <Typography variant="h5">{title}</Typography>
                            <Typography variant="caption">{`${difficulty
                              .charAt(0)
                              .toUpperCase()}${difficulty
                              .substr(1)
                              .toLowerCase()}, Max Score: 30`}</Typography>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={5}
                            component={Box}
                            display="flex"
                            className={classes.ctaWrapper}
                          >
                            <Button
                              className={classes.ctaButton}
                              variant="outlined"
                              color="primary"
                            >
                              Solve Challenge
                            </Button>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid item sm={4}>
              <Box paddingLeft={3} paddingRight={3} className={classes.aside}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="overline">Status</Typography>
                    <FormGroup>
                      <FormControlLabel
                        className={classes.formControlLabel}
                        control={<Checkbox />}
                        label="Solved"
                      />
                      <FormControlLabel
                        className={classes.formControlLabel}
                        control={<Checkbox />}
                        label="Unsolved"
                      />
                    </FormGroup>
                    <Divider className={classes.formGroupDivider} />
                  </Grid>
                  <Grid item>
                    <Typography variant="overline">Difficulty</Typography>
                    <FormGroup>
                      <FormControlLabel
                        className={classes.formControlLabel}
                        control={<Checkbox />}
                        label="Easy"
                      />
                      <FormControlLabel
                        className={classes.formControlLabel}
                        control={<Checkbox />}
                        label="Medium"
                      />
                      <FormControlLabel
                        className={classes.formControlLabel}
                        control={<Checkbox />}
                        label="Hard"
                      />
                    </FormGroup>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Doman;
