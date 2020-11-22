import React from 'react';
import './Header.scss';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const headerStyles = makeStyles({
    root: {
        flexGrow: 1,
        backgroundColor: '#07373B',
        color: 'white',
        alignItems: 'center'
    },
    title: {
        padding: '1em'
    }
})

export interface HeaderProps {
    title?: string,
    subtitle?: string
}

const Header: React.FC<HeaderProps> = ({title, subtitle}: HeaderProps) => {

    const classes = headerStyles();

    return (
        <AppBar position="sticky" className={classes.root}>
            <Typography variant="h4" className={classes.title}>
                {title}
            </Typography>
        </AppBar>
    );
}

Header.defaultProps = {
    title: 'Climate Mind'
}

export default Header;