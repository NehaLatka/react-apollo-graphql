import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing(1),
  },
  textField: {
  },
  box: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  loginpage :{
    width: '360px',
    padding: '8% 0 0',
    margin: 'auto',
    // marginTop: "5rem",
    // display: "grid",
    // justifyContent: "center",
  },
  detailtable :{
    width: '80%',
    padding: '10% 0 0',
    margin: 'auto'
  },
  table: {
    minWidth: 700,
  },
  formControl: {
    width: "hw-100",
    display:'block'
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
    margin: theme.spacing(1),
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  button: {
    margin: theme.spacing(1),
  },
  tabPanel: {
    margin: theme.spacing(1),
    minWidth: 200,
    width: 100
  },
  formLabel: {
  }
}));



export default useStyles;