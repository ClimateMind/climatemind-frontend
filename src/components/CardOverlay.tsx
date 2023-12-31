import { useState } from 'react';
import { ReactComponent as ArrowDown } from '../assets/icon-arrow-down.svg';
import { CardMedia, CardContent, Typography, Grid, Dialog, IconButton, DialogTitle, DialogContent, Button, Slide, Toolbar } from '@mui/material';
import { TActionNodeList } from '../types/Actions';
import { useSession } from '../hooks/useSession';
import { CardCloseEvent, CardOpenEvent, analyticsService } from 'services';

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
  const { sessionId } = useSession();

  const [showMore, setShowMore] = useState(false);

  const handleShowMoreClick = () => {
    setShowMore(!showMore);
    if (sessionId) analyticsService.postEvent(CardOpenEvent, iri);
  };

  const handleCardClose = () => {
    setShowMore(false);
    if (sessionId) analyticsService.postEvent(CardCloseEvent, iri);
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
        PaperProps={{
          style: {...styles.paper, backgroundColor: bgColor ? bgColor : '#FFF'},
        }}
      >
        <Slide direction="up" in={showMore} mountOnEnter unmountOnExit>
          <div style={styles.card} data-testid="CardOverlay">
            <DialogTitle style={{...styles.dialogHeader, backgroundColor: bgColor ? bgColor : '#FFF'}}>
              <Grid
                container
                item
                direction="column"
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item style={styles.closeArea}>
                  <Typography
                    style={styles.closeText}
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
                    style={styles.arrow}
                    data-testid="OverlayCloseButton"
                  >
                    <ArrowDown />
                  </IconButton>
                </Grid>
              </Grid>
            </DialogTitle>
            <DialogContent
              dividers={false}
              id="climate-effect-content"
            >
              {cardHeader}

              {imageUrl && (
                <CardMedia
                  style={styles.media}
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

      <CardContent style={styles.moreContainer}>
        <Toolbar disableGutters={true} style={styles.wrapper}>
          <Button
            style={styles.moreText}
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

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    padding: `0 8px`,
  },
  paper: {
    maxWidth: '640px',
    height: '100%',
    marginTop: '-16px',
  },
  dialogHeader: {
    textAlign: 'center',
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 1200,
  },
  dialogContent: {
    padding: 0,
  },
  moreContainer: {
    paddingBottom: '0 !Important',
    paddingTop: '0 !Important',
  },
  moreText: {
    textTransform: 'capitalize',
    marginBottom: '-0.5em',
    fontSize: '11pt',
    letterSpacing: '1pt',
  },
  card: {
    minWidth: '304px',
  },
  media: {
    margin: 0,
    paddingTop: '56.25%',
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
};

export default CMCardOverlay;
