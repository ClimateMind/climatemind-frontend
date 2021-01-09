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
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { TActionNodeList } from '../types/Actions';
import { addCardClickToDataLayer } from '../analytics';
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
}

const CMCardOverlay: React.FC<CMCardOverlayProps> = ({
  iri,
  cardHeader,
  title,
  imageUrl,
  children,
  bgColor,
  openButtonText = 'LEARN MORE',
}: CMCardOverlayProps) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: '100%',
      },
      paper: {
        maxWidth: 'calc(100% - 24px) !important',
        height: '100%',
        backgroundColor: bgColor ? bgColor : '#FFF',
      },
      dialogHeader: {
        textAlign: 'center',
        position: 'sticky',
        top: 0,
        left: 0,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        zIndex: 9999,
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
        paddingLeft: 0,
      },
      titleText: {
        textTransform: 'capitalize',
        margin: '0.3em 0 0',
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      },
      card: {
        minWidth: '343px',
      },
      media: {
        margin: 0,
        paddingTop: '56.25%',
      },
      arrow: {
        padding: 0,
        marginTop: '-7px',
      },
    })
  );

  const classes = useStyles();
  const { sessionId } = useSession();

  const [showMore, setShowMore] = React.useState(false);

  const handleShowMoreClick = () => {
    setShowMore(!showMore);
    addCardClickToDataLayer(iri, sessionId ? sessionId : null);
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
        }}
      >
        <Slide direction="up" in={showMore} mountOnEnter unmountOnExit>
          <div className={classes.card}>
            <DialogTitle className={classes.dialogHeader}>
              <Grid
                container
                item
                direction="column"
                alignItems="center"
                justify="space-between"
              >
                <Grid item>
                  <Typography variant="body1" component="p">
                    Close
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="close"
                    onClick={handleShowMoreClick}
                    className={classes.arrow}
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
        <Button
          className={classes.moreText}
          variant="text"
          onClick={handleShowMoreClick}
          data-testid="CMCardMore"
        >
          {openButtonText}
        </Button>
      </CardContent>
    </>
  );
};

export default CMCardOverlay;
