import React, { useState } from 'react';
import { ReactComponent as ArrowDown } from '../assets/icon-arrow-down.svg';
import {
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  Theme,
  Collapse,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createStyles } from '@material-ui/core/styles';

export interface DashboardProps {
  title?: string;
  children?: React.ReactNode;
  bgColor?: string;
}

const Dashboard: React.FC<DashboardProps> = ({
  title,
  children,
  bgColor,
}: DashboardProps) => {
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
      dashContainer: {
        minHeight: '80vh',
        maxHeight: '80vh',
        backgroundColor: bgColor ? bgColor : '#FFF',
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
     
      titleText: {
        textTransform: 'capitalize',
        margin: '0.3em 0 0',
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
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
      arrow: {
        width: '32px',
        height: '32px',
        padding: 0,
        marginTop: '50px',
      },
      test1: {
        position:'relative', 
        width: '100px',
        height: '95%',
        border:'1px solid white',
      },
      test2: {
        border:'1px solid green',
        position: 'absolute', 
        bottom: 0,
        left: 0,
        width: '100%',
        height: '20px'
      },
      test3: {
        backgroundColor: bgColor ? bgColor : '#FFF',
        minHeight: '90vh',
        maxHeight: '90vh',
      },
      test4: {
        overflow: 'hidden',
        minHeight: '100vh',
        maxHeight: '100vh',
      },
    })
  );

  const classes = useStyles();

  const [showDash, setShowDash] = useState(true);
  
  type TDirection = 'up' | 'down';
  const [slideDirection, setSlideDirection] = useState<TDirection>('up');

  const handleShowClick = () => {
    setShowDash(!showDash);
    // if (sessionId) addCardOpenToDataLayer(iri, sessionId);
  };


  return (
    <>
      <div className={classes.test4}>
        <IconButton
          aria-label="close"
          onClick={handleShowClick}
          className={classes.arrow}
          data-testid="OverlayCloseButton"
        >
          <ArrowDown />
        </IconButton>
        <Slide in={showDash} direction={slideDirection}>
          <div className={classes.test3}>
              some sliding content some sliding content some sliding content. some sliding contentsome sliding contentsome sliding contentsome sliding contentsome slid
          </div>
        </Slide>
      </div>


    {/* <div className={classes.test4}>
      <IconButton
        aria-label="close"
        onClick={handleShowClick}
        className={classes.arrow}
        data-testid="OverlayCloseButton"
      >
        <ArrowDown />
      </IconButton>
      <Slide in={showDash} direction={slideDirection}> 
        <Collapse in={showDash} collapsedHeight={148}>
          <div className={classes.test3}>
              some sliding content some sliding content. some sliding contentsome sliding contentsome sliding contentsome sliding contentsome sliding content
          </div>
        </Collapse>
      </Slide>
    </div>  */}

    {/* <div className={classes.test1}>
      <Dialog
        onClose={handleShowClick}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="climate-effect-content"
        open={showDash}
        fullWidth={true}
        scroll="paper"
        classes={{paper: classes.dashContainer}}
      >
        <Slide direction="up" in={showDash} mountOnEnter unmountOnExit>
          <div data-testid="CardOverlay">
            <DialogTitle className={classes.dialogHeader}>
              <Grid
                container
                item
                direction="column"
                alignItems="center"
                justify="space-between"
              >
                
                <Grid item>
                  <IconButton
                    aria-label="close"
                    onClick={handleShowClick}
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
              some text

              {children}
            </DialogContent>
          </div>
        </Slide>
      </Dialog>
        <div className={classes.test2}></div>
      </div> */}
    </>
  );
};

export default Dashboard;
