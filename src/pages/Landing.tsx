import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { COLORS } from '../common/styles/CMTheme';

const styles = makeStyles(() => {
    return {
        root: {
            minHeight: '100vh',
            backgroundColor: COLORS.SECONDARY,
        },
        typography: {
            textAlign: 'center',
        },
        container: {
            textAlign: 'center',
            maxWidth: '640px',
            margin: '0 auto',
            padding: '0 1em',
        },
    };
});

export default function Landing() {
    const classes = styles();

    const takeTheQuiz = () => {
        // take quiz action goes here
    };

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <Box pt={8} mb={4}>
                    <Typography
                        component="h1"
                        variant="h4"
                        className={classes.typography}
                    >
                        Your friend would like you to take a personal values questionnaire.
                    </Typography>
                </Box>
                <Box mt={5} mb={1}>
                    <Button
                        onClick={takeTheQuiz}
                        variant="contained"
                        color="primary"
                        disableElevation
                    >
                        TAKE THE QUIZ
                    </Button>
                </Box>
            </div>
        </div>
    );
}
