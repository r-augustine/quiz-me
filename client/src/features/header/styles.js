import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    background: "#ffffff",
  },
  link: {
    textTransform: "capitalize",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
  },

  title: {
    fontWeight: theme.typography.fontWeightMedium,
    textTransform: "capitalize",
  },
}));

export default useStyles;
