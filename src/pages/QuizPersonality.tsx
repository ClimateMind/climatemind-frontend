import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button, Grid, Box } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ROUTES from '../components/Router/RouteConfig';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // maxWidth: 345,
      flexGrow: 1,
      backgroundColor: '#EFE282',
      minHeight: '100vh',
    },
    section: {
      height: '45vh',
    },
    infopanel: {
      width: 345,
      hight: 400,
      border: '3px solid teal',
    },
      typography: {
      textAlign: 'center',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }),
);

const QuizPersonality: React.FC<{}> = () => {
  // const classes = styles();
  const classes = useStyles();
  const history = useHistory();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid container className={classes.root} data-testid="QuizPersonality">
      <Grid item sm={false} lg={4}>
        {/* left gutter */}
      </Grid>

      <Grid item sm={12} lg={4}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Box mt={2} mb={4} mx={2}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={3}>
                  <Logo width="76" data-testid="climate-mind-logo" />
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h4">Good to meet you [Name]!</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item>
            <Box ml={2} mr={2} mb={1}>
              <Typography
                variant="h6"
                align="center"
                className={classes.typography}
              >
                Lets find out your climate personality
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <div className={classes.section}>
              <Card className={classes.infopanel}>
                
                {/* <CardActions > */}
                  
                  <IconButton
                    // className={clsx(classes.expand, {
                    //   [classes.expandOpen]: expanded,
                    // })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <Typography className={classes.typography} align="center">What's a Climate Personality? </Typography>
                    <ExpandMoreIcon />
                  </IconButton>
                {/* </CardActions> */}
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>To make decisions we each employ three personal values.</Typography>
                    <Typography paragraph>
                      These values can be linked to climate concepts and Climate Mind works by giving 
                      you a personal view of how climate change is affecting you now.
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </div>
          </Grid>

          <Grid item>
            <Box pr={2} pl={2}>
              <Typography className={classes.typography}>
                Read each statement and decide how much you are like or not like that.
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <Box mt={4} mb={8}>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={() => history.push(ROUTES.ROUTE_QUIZ)}
              >
                Take the quiz
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid item sm={false} lg={4}>
        {/* right gutter */}
      </Grid>
    </Grid>
  );
};

export default QuizPersonality;
