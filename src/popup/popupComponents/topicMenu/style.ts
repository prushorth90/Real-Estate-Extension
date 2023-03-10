import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    // controls the width of select menu
    minWidth: 430,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
