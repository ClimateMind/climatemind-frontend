import React from 'react';
import { ReactComponent as ArrowDown } from '../assets/icon-arrow-down.svg';
import {
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Slide,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
// import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
    more: {
      textTransform: 'capitalize',
      marginBottom: '-0.5em',
      fontSize: '11pt',
      letterSpacing: '1pt',
      paddingLeft: 0,
    },
    topActions: {
      marginTop: '-15px',
    },
    pretitle: {
      textTransform: 'uppercase',
      letterSpacing: '1pt',
      fontSize: '10px',
      marginBottom: '0.3em',
      marginTop: '1em',
    },
    title: {
      textTransform: 'capitalize',
      margin: '0.3em 0 0',
    },
    card: {
      backgroundColor: '#fff',
      height: '100%',
      minWidth: '343px',
    },
    paper: {
      maxWidth: 'calc(100% - 24px) !important',
      marginTop: '24px',
      marginBottom: '18px',
      height: '100%',
    },
    media: {
      margin: 0,
      paddingTop: '56.25%',
    },
    arrow: {
      padding: 0,
      marginTop: '-7px',
    },
    bookmark: {
      color: '#07373B',
      height: '24px',
      marginTop: '-0.3em',
    },
  })
);

interface CMCardOverlayProps {
  title?: string;
  imageUrl?: string;
  shortDescription: string;
  description?: string;
}

const CMCardOverlay: React.FC<CMCardOverlayProps> = ({
  title,
  imageUrl,
  shortDescription,
  description,
}: CMCardOverlayProps) => {
  const classes = useStyles();

  const [showMore, setShowMore] = React.useState(false);

  const handleShowMoreClick = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <Dialog
        onClose={handleShowMoreClick}
        aria-labelledby="simple-dialog-title"
        open={showMore}
        fullWidth={true}
        scroll="paper"
        maxWidth="sm"
        classes={{
          paperWidthSm: classes.paper,
        }}
      >
        <Slide direction="up" in={showMore} mountOnEnter unmountOnExit>
          <div>
            <DialogTitle>
              <Grid
                container
                direction="column"
                alignItems="center"
                justify="space-between"
              >
                <Typography variant="body1" component="p">
                  Close
                </Typography>
                <IconButton
                  aria-label="show more"
                  onClick={handleShowMoreClick}
                  className={classes.arrow}
                >
                  <ArrowDown />
                </IconButton>
              </Grid>
            </DialogTitle>

            <DialogContent>
              <Typography
                className={classes.title}
                gutterBottom
                variant="h6"
                component="h2"
              >
                {title}
              </Typography>

              {imageUrl && (
                <CardMedia
                  className={classes.media}
                  image={imageUrl}
                  title={`${title} icon`}
                  data-testid="CMCard-Image"
                />
              )}

              <Typography variant="body1" component="p">
                {shortDescription}
              </Typography>

              {description && (
                <Typography variant="body1" component="p">
                  {description}
                </Typography>
              )}
            </DialogContent>
          </div>
        </Slide>
      </Dialog>

      <CardContent>
        <Button
          className={classes.more}
          variant="text"
          onClick={handleShowMoreClick}
          data-testid="CMCardMore"
        >
          LEARN MORE
        </Button>
      </CardContent>
    </>
  );
};

export default CMCardOverlay;
