import {
  Card,
  CardMedia,
  Typography,
  Grid,
  CardContent,
  Box,
} from '@material-ui/core';
import { ActionIcon } from './ActionIcon';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ActionHeadline from './ActionHeadline';
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
  cardIcon?: 'prevention' | 'protection';
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
  cardIcon,
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
      preTitle: {
        textTransform: 'uppercase',
        letterSpacing: '1pt',
        fontSize: '10px',
        marginBottom: '-0.2em',
      },
      title: {
        textTransform: 'capitalize',
        marginBottom: '-0.3em',
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

  const CardHeader = () => (
    <CardContent>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={2}
      >
        {cardIcon && (
          <Grid item xs={2} className={classes.iconContainer}>
            <ActionIcon actionType={cardIcon} />
          </Grid>
        )}
        <Grid item xs={10} container>
          <Box>
            {numberedCards && (
              <Typography
                className={classes.title}
                gutterBottom
                variant="overline"
                component="p"
              >
                {numberedCards ? `NO. ${index + 1}` : null}
              </Typography>
            )}
            {preTitle && (
              <Typography
                className={classes.preTitle}
                gutterBottom
                variant="h6"
                component="h3"
              >
                {preTitle}
              </Typography>
            )}
            <Typography
              className={classes.title}
              gutterBottom
              variant="h6"
              component="h2"
            >
              {title}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  );

  return (
    <Grid item sm={12} lg={12} className={classes.root} data-testid="CMCard">
      <Card className={classes.card}>
        <CardHeader />

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
        {actionHeadline && (
          <ActionHeadline
            actionHeadline={actionHeadline}
            icon={<EmojiObjectsIcon fontSize="default" />}
          />
        )}
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
