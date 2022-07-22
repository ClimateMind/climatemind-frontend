/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  CardContent,
  Typography,
  Collapse,
  CardActions,
  Button,
  Box,
} from '@material-ui/core';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '1em 1em',
    },
    moreContainer: {
      paddingLeft: 0,
      marginLeft: 0,
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
  shortDescription?: string;
}

const CMCardFoldout: React.FC<CMCardFoldoutProps> = ({
  description,
  shortDescription,
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
          {/* Show short desciption if ther is one */}
          {shortDescription && (
            <Typography variant="body1" component="p">
              {shortDescription}
            </Typography>
          )}
          {/* Show Long desciption if ther is one */}
          {description && (
            <Typography variant="body1" component="p">
              {description}
            </Typography>
          )}
        </CardContent>
      </Collapse>

      <CardActions className={classes.moreContainer}>
        <Button
          className={classes.more}
          variant="text"
          onClick={handleShowMoreClick}
          data-testid="CMCardMore"
        >
          <Box px={1}>{showMore ? 'LESS' : 'MORE'}</Box>
        </Button>
      </CardActions>
    </>
  );
};

CMCardFoldout.defaultProps = {
  description:
    'Cupidatat aute Lorem aliquip fugiat reprehenderit pariatur sunt est incididunt mollit reprehenderit tempor irure excepteur. Do labore aliquip reprehenderit consectetur dolore mollit Lorem fugiat exercitation magna elit aliquip commodo commodo. Dolor adipisicing exercitation incididunt irure dolor ad aute ad commodo mollit proident. Ullamco sunt voluptate sunt quis.',
};

export default CMCardFoldout;
