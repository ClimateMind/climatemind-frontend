import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#fff',
      margin: '1em 1em',
    },
    title: {
      textTransform: 'capitalize',
    },
  })
);

interface CMCardProps {
  title?: string;
  bodyText?: string;
  children?: React.ReactNode;
}

const CMCard: React.FC<CMCardProps> = ({ title, bodyText }: CMCardProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root} data-testid="ExpandableCard">
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography
              className={classes.titleCard Title}
              gutterBottom
              variant="h6"
              component="h2"
            >
              {title}
            </Typography>
            <Typography variant="body1" component="p">
              {bodyText}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

CMCard.defaultProps = {
  title: 'Climate Mind',
  bodyText:
    'Cupidatat aute Lorem aliquip fugiat reprehenderit pariatur sunt est incididunt mollit reprehenderit tempor irure excepteur. Do labore aliquip reprehenderit consectetur dolore mollit Lorem fugiat exercitation magna elit aliquip commodo commodo. Dolor adipisicing exercitation incididunt irure dolor ad aute ad commodo mollit proident. Ullamco sunt voluptate sunt quis.',
};

export default CMCard;
