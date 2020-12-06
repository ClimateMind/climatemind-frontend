import {
  Card,
  CardMedia,
  Typography,
  Grid,
  CardContent,
  Box,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CardHeader from './CardHeader';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import React from 'react';

export interface CMCardProps {
  title: string;
  shortDescription: string;
  index: number;
  numberedCards?: boolean;
  imageUrl?: string;
  footer?: React.ReactNode;
  actionHeadline?: string;
  cardIcon?: 'prevention' | 'protection' | false;
  bgColor?: string;
  preTitle?: string;
}

const CMCard: React.FC<CMCardProps> = ({
  title,
  shortDescription,
  index,
  numberedCards,
  imageUrl,
  footer,
  actionHeadline,
  cardIcon = false,
  bgColor,
  preTitle,
}: CMCardProps) => {
  const useStyles = makeStyles((theme: Theme) =>
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
      cardHeader: {
        paddingTop: '8px',
        paddingBottom: '0',
      },
      iconContainer: {
        textAlign: 'center',
      },
      icon: {
        textAlign: 'center',
      },
      cardNumber: {
        textTransform: 'uppercase',
        letterSpacing: '0.5pt',
        fontSize: '10px',
      },
      preTitle: {
        textTransform: 'uppercase',
        letterSpacing: '1pt',
        fontSize: '10px',
        marginBottom: '-0.4em',
      },
      title: {
        textTransform: 'capitalize',
        margin: 0,
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
        <CardHeader title={title} index={index} />

        {imageUrl && (
          <CardMedia
            className={classes.media}
            image={imageUrl}
            title={`${title} icon`}
            data-testid="CMCard-Image"
          />
        )}

        <CardContent>
          <Typography variant="body1" component="p">
            {shortDescription}
          </Typography>
        </CardContent>

        {footer}
        {/* {actionHeadline && (
          <ActionHeadline
            actionHeadline={actionHeadline}
            icon={<EmojiObjectsIcon fontSize="default" />}
          />
        )} */}
      </Card>
    </Grid>
  );
};

CMCard.defaultProps = {
  title: 'Climate Mind',
  shortDescription:
    'Cupidatat aute Lorem aliquip fugiat reprehenderit pariatur sunt est incididunt mollit reprehenderit tempor irure excepteur. Do labore aliquip reprehenderit consectetur dolore mollit Lorem fugiat exercitation magna elit aliquip commodo commodo. Dolor adipisicing exercitation incididunt irure dolor ad aute ad commodo mollit proident. Ullamco sunt voluptate sunt quis.',
  numberedCards: true,
};

export default CMCard;
