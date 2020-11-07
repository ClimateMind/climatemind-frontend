/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { ReactComponent as ArrowDown } from '../assets/icon-arrow-down.svg';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Collapse,
  Zoom,
  Paper,
  CardActions,
  Button,
  Modal,
  Dialog,
  DialogTitle,
  DialogActions,
  Box,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';


import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // margin: '1em 1em',
      // height: '100%',
      width: '100%',
    },
    more: {
      textTransform: 'capitalize',
      marginBottom: '-0.5em',
      fontSize: '11pt',
      letterSpacing: '1pt',
    },
    dialogActions: {
      width: '100%',
      border: '1 px solid blue',
    },
    title: {
      textTransform: 'capitalize',
      marginBottom: '-0.3em',
    },
    card: {
      backgroundColor: '#fff',
      height: '100%',
      minWidth: '343px',
    },
    media: {
      // height: '100px',
      margin: 0,
      paddingTop: '56.25%',
    },
  })
);

interface CMCardOverlayProps {
  title?: string;
  imageUrl?: string;
  shortDescription: string;
  
}

const CMCardOverlay: React.FC<CMCardOverlayProps> = ({
  title,
  imageUrl,
  shortDescription,
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
        fullWidth
        scroll="body"
        maxWidth="sm"
        >
        {/* <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Typography variant="body1" component="p">
            close
          </Typography>
          <IconButton
            aria-label="show more"
            onClick={handleShowMoreClick}
          >
            <ArrowDown />
          </IconButton>
        </Box>
        <Box>
          <Typography
              className={classes.title}
              gutterBottom
              variant="h6"
              component="h2"
            >
              {title}
          </Typography>
        </Box>
        
        <img src={imageUrl} alt={title} />
        Cupidatat aute Lorem aliquip fugiat reprehenderit pariatur sunt est incididunt mollit reprehenderit tempor irure excepteur. Do labore aliquip reprehenderit consectetur dolore mollit Lorem fugiat exercitation magna elit aliquip commodo commodo. Dolor adipisicing exercitation incididunt irure dolor ad aute ad commodo mollit proident. Ullamco sunt voluptate sunt quis. */}
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Typography variant="body1" component="p">
              close
            </Typography>
            <IconButton
              aria-label="show more"
              onClick={handleShowMoreClick}
            >
              <ArrowDown />
            </IconButton>
          </Box>
          <Card className={classes.card}>
            <CardContent>
              
              <Typography
                className={classes.title}
                gutterBottom
                variant="h6"
                component="h2"
              >
                {title}
              </Typography>
            </CardContent>

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
        Cupidatat aute Lorem aliquip fugiat reprehenderit pariatur sunt est incididunt mollit reprehenderit tempor irure excepteur. Do labore aliquip reprehenderit consectetur dolore mollit Lorem fugiat exercitation magna elit aliquip commodo commodo. Dolor adipisicing exercitation incididunt irure dolor ad aute ad commodo mollit proident. Ullamco sunt voluptate sunt quis. 
      Cupidatat aute Lorem aliquip fugiat reprehenderit pariatur sunt est incididunt mollit reprehenderit tempor irure excepteur. Do labore aliquip reprehenderit consectetur dolore mollit Lorem fugiat exercitation magna elit aliquip commodo commodo. Dolor adipisicing exercitation incididunt irure dolor ad aute ad commodo mollit proident. Ullamco sunt voluptate sunt quis. 
    Cupidatat aute Lorem aliquip fugiat reprehenderit pariatur sunt est incididunt mollit reprehenderit tempor irure excepteur. Do labore aliquip reprehenderit consectetur dolore mollit Lorem fugiat exercitation magna elit aliquip commodo commodo. Dolor adipisicing exercitation incididunt irure dolor ad aute ad commodo mollit proident. Ullamco sunt voluptate sunt quis. 
  Cupidatat aute Lorem aliquip fugiat reprehenderit pariatur sunt est incididunt mollit reprehenderit tempor irure excepteur. Do labore aliquip reprehenderit consectetur dolore mollit Lorem fugiat exercitation magna elit aliquip commodo commodo. Dolor adipisicing exercitation incididunt irure dolor ad aute ad commodo mollit proident. Ullamco sunt voluptate sunt quis. 
Cupidatat aute Lorem aliquip fugiat reprehenderit pariatur sunt est incididunt mollit reprehenderit tempor irure excepteur. Do labore aliquip reprehenderit consectetur dolore mollit Lorem fugiat exercitation magna elit aliquip commodo commodo. Dolor adipisicing exercitation incididunt irure dolor ad aute ad commodo mollit proident. Ullamco sunt voluptate sunt quis. 

              </Typography>
            </CardContent>
          </Card>
      </Dialog>
      <Button
        className={classes.more}
        variant="text"
        onClick={handleShowMoreClick}
        data-testid="CMCardMore"
      >
        {showMore ? '' : 'MORE'}
      </Button>
    </>
  );
};

CMCardOverlay.defaultProps = {
  shortDescription: 'Cupidatat aute Lorem aliquip fugiat reprehenderit pariatur sunt est incididunt mollit reprehenderit tempor irure excepteur. Do labore aliquip reprehenderit consectetur dolore mollit Lorem fugiat exercitation magna elit aliquip commodo commodo. Dolor adipisicing exercitation incididunt irure dolor ad aute ad commodo mollit proident. Ullamco sunt voluptate sunt quis.',
};

export default CMCardOverlay;
