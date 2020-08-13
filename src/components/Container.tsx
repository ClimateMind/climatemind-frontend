import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
    root: {
        flexGrow: 1,
        backgroundColor: (props: ContainerProps) => props.bgColor,
        'min-height': '100vh'
    }
});

type ContainerProps = {
    bgColor?: string,
    children: React.ReactNode
}
  
const CMContainer: React.FC<ContainerProps> = (props) => {
    const classes = styles(props);

    return (
        <Container maxWidth="xl" className={classes.root}>
            <div>{props.children}</div>
        </Container>
    )
};

CMContainer.defaultProps = {
    bgColor: 'white'
}

export default CMContainer;