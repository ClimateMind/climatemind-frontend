import React from 'react';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import Button from '../components/Button';
import {ReactComponent as Logo} from '../assets/cm-logo.svg';

const styles = makeStyles({
    root: {
        flexGrow: 1,
        'min-height': '100vh',
        padding: '15vh 0'
    },
    typography: {
        letterSpacing: 1,
        fontWeight: 600,
        textAlign: 'center',
        wordSpacing: '100vw',        
    }
});

const Home: React.FC<{}> = () => {

    const classes = styles();

    return (
        <Grid 
            container
            direction="column"
            justify="space-around"
            alignItems="center"
            className={classes.root}
        >
            <Typography variant="h5">
                Welcome to
            </Typography>
            <Logo data-testid="climate-mind-logo" />
            <Typography variant="h5" className={classes.typography}>
                Powering climate conversations
            </Typography>
            <Button 
                displayText="Get started" 
                onClick={() => console.log('take me to meet guy')} 
            />
        </Grid>
    )
}

export default Home;