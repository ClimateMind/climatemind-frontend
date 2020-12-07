import React from 'react';
import {
  Card,
  CardMedia,
  Typography,
  Grid,
  CardContent,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

export interface CardProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  preview?: React.ReactNode;
  shortDescription: string;
  index?: number;
  imageUrl?: string;
  actionHeadline?: string;
  cardIcon?: 'prevention' | 'protection' | false;
  bgColor?: string;
  preTitle?: string;
}

const CMCard: React.FC<CardProps> = ({
  header,
  shortDescription,
  imageUrl,
  preview,
  footer,
  bgColor,
}: CardProps) => {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        margin: '1em 0',
        width: '100%',
      },
      card: {
        backgroundColor: bgColor,
        height: '100%',
        width: '100%',
      },
      media: {
        margin: 0,
        paddingTop: '56.25%',
      },
      more: {
        textTransform: 'capitalize',
        marginBottom: '-0.5em',
        fontSize: '11pt',
        letterSpacing: '1pt',
      },
    })
  );

  const classes = useStyles();

  return (
    <Grid item sm={12} lg={12} className={classes.root} data-testid="CMCard">
      <Card className={classes.card}>
        {header}
        {imageUrl && (
          <CardMedia
            className={classes.media}
            image={imageUrl}
            // title={`${title} icon`} Need to add image description
            data-testid="CMCard-Image"
          />
        )}

        <CardContent>
          <Typography variant="body1" component="p">
            {shortDescription}
          </Typography>
        </CardContent>

        {footer}
        {preview}
      </Card>
    </Grid>
  );
};

CMCard.defaultProps = {
  shortDescription:
    'Cupidatat aute Lorem aliquip fugiat reprehenderit pariatur sunt est incididunt mollit reprehenderit tempor irure excepteur. Do labore aliquip reprehenderit consectetur dolore mollit Lorem fugiat exercitation magna elit aliquip commodo commodo. Dolor adipisicing exercitation incididunt irure dolor ad aute ad commodo mollit proident. Ullamco sunt voluptate sunt quis.',
};

export default CMCard;
