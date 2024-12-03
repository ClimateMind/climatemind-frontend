import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

interface Props extends React.ComponentProps<typeof TextField> {}

const CmTextInput = styled((props: Props) => (
  <TextField variant="filled" fullWidth {...props} />
))({
  background: 'white !important',
  // Label styles
  '& .MuiFormLabel-root': {
    fontFamily: 'Nunito',
    fontWeight: 700,
    color: '#889A9C',
  },
  '& .MuiFormLabel-root.Mui-focused': {
    color: '#889A9C',
  },

  // Input styles
  '& .MuiInputBase-root': {
    backgroundColor: 'white',
    fontFamily: 'Nunito',
    fontWeight: 700,
    color: '#07373B',
    borderRadius: "10px",
  },
  '& .MuiInputBase': {
    backgroundColor: 'white',
  },
  '& .MuiFilledInput-root': {
    backgroundColor: 'white',
  },
  '& .MuiFilledInput': {
    backgroundColor: 'white',
      },


  // Underline styles
  '& .MuiFilledInput-underline:after': {
    borderBottomColor: '#39F5AD',
  },
  '& .Mui-error:after': {
    transform: 'scaleX(1)',
    borderBottomColor: '#B00620',
  },

  // Error text styles
  '& .MuiFormHelperText-root': {
    color: '#B00620',
    fontFamily: 'Nunito',
    fontWeight: 700,
  },
  '& .Mui-error': {
    color: '#B00620',
  },
});

export default CmTextInput;
