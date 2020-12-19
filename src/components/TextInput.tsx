import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const CMTextField = withStyles({
  root: {
    '& label': {
      color: '#889a9c',
    },
    '& label.Mui-focused': {
      color: '#889a9c',
    },
    '& .MuiFilledInput-underline': {
      backgroundColor: '#FFF',
    },
  },
})(TextField);

export default CMTextField;
