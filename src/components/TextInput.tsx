import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { COLORS } from '../common/styles/CMTheme';

const CMTextField = withStyles({
  root: {
    '& label': {
      color: '#889a9c',
    },
    '& label.Mui-focused': {
      color: '#889a9c',
    },
    '& label.Mui-focused.Mui-error': {
      color: COLORS.ERROR,
    },
    '& .MuiFilledInput-underline': {
      backgroundColor: '#FFF',
    },
  },
})(TextField);

export default CMTextField;
