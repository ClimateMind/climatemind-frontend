import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
  CardMedia,
} from '@material-ui/core';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '1em 1em',
      // height: '100%',
    },
    card: {
      backgroundColor: '#fff',
      height: '100%',
      padding: 0
    },
    title: {
      textTransform: 'capitalize',
      marginTop: '-0.5em',
    },
    media: {
      // height: '100px',
      margin: 0,
      paddingTop: '56.25%',
      border: '1px solid red',
    }
  })
);

interface CMCardProps {
  title: string;
  bodyText: string;
  index: number;
}

const CMCard: React.FC<CMCardProps> = ({
  title,
  bodyText,
  index,
}: CMCardProps) => {
  const classes = useStyles();

  return (
    <Grid
      item
      sm={12}
      lg={12}
      container
      className={classes.root}
      data-testid="CMCard"
    >
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography
              className={classes.title}
              gutterBottom
              variant="overline"
              component="p"
            >
              NO#. {index + 1}
            </Typography>
          </CardContent>
          <CardMedia 
              className={classes.media}
              image={require('../assets/personalities/benevolence-v2.gif')}
              title="Benevolence"
            />
          <CardContent>
            <Typography
              className={classes.title}
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
    </Grid>
  );
};

CMCard.defaultProps = {
  title: 'Climate Mind',
  bodyText:
    'Cupidatat aute Lorem aliquip fugiat reprehenderit pariatur sunt est incididunt mollit reprehenderit tempor irure excepteur. Do labore aliquip reprehenderit consectetur dolore mollit Lorem fugiat exercitation magna elit aliquip commodo commodo. Dolor adipisicing exercitation incididunt irure dolor ad aute ad commodo mollit proident. Ullamco sunt voluptate sunt quis.',
};

export default CMCard;
