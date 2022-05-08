import React from 'react';
import { ReactComponent as ArrowDown } from '../assets/icon-arrow-down.svg';
import {
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Slide,
  Theme,
  Toolbar,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { TActionNodeList } from '../types/Actions';
import { addCardOpenToDataLayer, addCardCloseToDataLayer } from '../analytics';
import { useSession } from '../hooks/useSession';

interface CMCardOverlayProps {
  iri: string;
  cardHeader?: React.ReactNode;
  title?: string;
  imageUrl?: string;
  actionNodes?: TActionNodeList;
  children?: React.ReactNode;
  isAction?: boolean;
  openButtonText?: string;
  bgColor?: string;
  selectAction?: React.ReactNode;
}

const CMCardOverlay: React.FC<CMCardOverlayProps> = ({
  iri,
  cardHeader,
  title,
  imageUrl,
  children,
  bgColor,
  openButtonText = 'LEARN MORE',
  selectAction,
}: CMCardOverlayProps) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        padding: `0 8px`,
      },
      paper: {
        maxWidth: '640px',
        height: '100%',
        backgroundColor: bgColor ? bgColor : '#FFF',
        marginTop: '-16px',
      },
      dialogHeader: {
        textAlign: 'center',
        position: 'sticky',
        top: 0,
        left: 0,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        zIndex: 1200,
        backgroundColor: bgColor ? bgColor : '#FFF',
      },
      dialogContent: {
        padding: 0,
      },
      moreContainer: {
        paddingBottom: '0 !Important',
        paddingTop: '0 !Important',
        paddingLeft: theme.spacing(1),
      },
      moreText: {
        textTransform: 'capitalize',
        marginBottom: '-0.5em',
        fontSize: '11pt',
        letterSpacing: '1pt',
      },
      titleText: {
        textTransform: 'capitalize',
        margin: '0.3em 0 0',
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      },
      card: {
        minWidth: '304px',
      },
      media: {
        margin: 0,
        paddingTop: '56.25%',
      },
      closeArea: {
        '& p': {
          fonstSize: '12px',
        },
      },
      closeText: {
        fontSize: '10px',
      },
      arrow: {
        width: '32px',
        height: '32px',
        padding: 0,
        marginTop: '-20px',
      },
      wrapper: {
        width: '100%',
        maxWidth: '640px',
        display: 'flex',
        justifyContent: 'space-between',
      },
    })
  );

  const classes = useStyles();
  const { sessionId } = useSession();

  const [showMore, setShowMore] = React.useState(false);

  const handleShowMoreClick = () => {
    setShowMore(!showMore);
    if (sessionId) addCardOpenToDataLayer(iri, sessionId);
  };

  const handleCardClose = () => {
    setShowMore(false);
    if (sessionId) addCardCloseToDataLayer(iri, sessionId);
  };

  return (
    <>
      <Dialog
        onClose={handleShowMoreClick}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="climate-effect-content"
        open={showMore}
        fullWidth={true}
        scroll="paper"
        maxWidth="sm"
        classes={{
          paperWidthSm: classes.paper,
          container: classes.root,
        }}
      >
        <Slide direction="up" in={showMore} mountOnEnter unmountOnExit>
          <div className={classes.card} data-testid="CardOverlay">
            <DialogTitle className={classes.dialogHeader}>
              <Grid
                container
                item
                direction="column"
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item className={classes.closeArea}>
                  <Typography
                    className={classes.closeText}
                    onClick={handleCardClose}
                    variant="h3"
                    component="h3"
                  >
                    Close
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="close"
                    onClick={handleCardClose}
                    className={classes.arrow}
                    data-testid="OverlayCloseButton"
                  >
                    <ArrowDown />
                  </IconButton>
                </Grid>
              </Grid>
            </DialogTitle>
            <DialogContent
              classes={{ root: classes.dialogContent }}
              dividers={false}
              id="climate-effect-content"
            >
              {cardHeader}

              {imageUrl && (
                <CardMedia
                  className={classes.media}
                  image={imageUrl}
                  title={`${title} icon`}
                  data-testid="CMCard-Image"
                />
              )}

              {children}
            </DialogContent>
          </div>
        </Slide>
      </Dialog>

      <CardContent className={classes.moreContainer}>
        <Toolbar disableGutters={true} className={classes.wrapper}>
          <Button
            className={classes.moreText}
            variant="text"
            onClick={handleShowMoreClick}
            data-testid="CMCardMore"
          >
            {openButtonText}
          </Button>
          {selectAction}
        </Toolbar>
      </CardContent>
    </>
  );
};

export default CMCardOverlay;
