import { Grid, CircularProgress } from '@mui/material';

const Home: React.FC<{}> = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      style={{
        flexGrow: 1,
        minHeight: '100vh',
        height: '100%',
        padding: '15vh 0',
      }}
    >
      <CircularProgress color="secondary" />
    </Grid>
  );
};

export default Home;
