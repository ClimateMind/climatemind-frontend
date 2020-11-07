/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Collapse,
  CardActions,
  Button,
} from '@material-ui/core';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '1em 1em',
      // height: '100%',
    },
    more: {
      textTransform: 'capitalize',
      marginBottom: '-0.5em',
      fontSize: '11pt',
      letterSpacing: '1pt',
    },
  })
);

interface CMCardFoldoutProps {
  description?: string;
  
}

const CMCardFoldout: React.FC<CMCardFoldoutProps> = ({
  
  description,
}: CMCardFoldoutProps) => {

  const classes = useStyles();

  const [showMore, setShowMore] = React.useState(false);

  const handleShowMoreClick = () => {
    setShowMore(!showMore);
  };


  return (
    <>
      <Collapse in={showMore} timeout="auto" unmountOnExit>
        <CardContent>
        {description && (
            <Typography variant="body1" component="p">
            {description}
            </Typography>
        )}
        </CardContent>
      </Collapse>   

      <CardActions>
      <Button
        className={classes.more}
        variant="text"
        onClick={handleShowMoreClick}
        data-testid="CMCardMore"
      >
        {showMore ? 'LESS' : 'MORE'}
      </Button>
      </CardActions>
    </>
  );
};

CMCardFoldout.defaultProps = {
  description: 'Cupidatat aute Lorem aliquip fugiat reprehenderit pariatur sunt est incididunt mollit reprehenderit tempor irure excepteur. Do labore aliquip reprehenderit consectetur dolore mollit Lorem fugiat exercitation magna elit aliquip commodo commodo. Dolor adipisicing exercitation incididunt irure dolor ad aute ad commodo mollit proident. Ullamco sunt voluptate sunt quis.',
};

export default CMCardFoldout;
