import React from 'react';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { ReactComponent as ArrowDown } from '../assets/icon-arrow-down.svg';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: {
      height: '32vh',
      zIndex: 75,
      position: 'relative',
    },
    infopanel: {
      width: 345,
      border: '1px solid #39F5AD',
      fontWeight: 'lighter',
    },
    typography: {
      textAlign: 'center',
    },
    title: {
      fontFamily: 'atten-round-new',
      fontSize: 16,
      fontWeight: 900,
      marginLeft: '7pt',
      marginRight: '4pt',
      letterSpacing: '0.6pt',
      lineHeight: '22pt',
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
  })
);

interface ExpandableCardProps {
  title?: string;
  children?: React.ReactNode;
}

const ExpandableCard: React.FC<ExpandableCardProps> = ({
  title,
  children,
}: ExpandableCardProps) => {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={classes.section} data-testid="ExpandableCard">
      <Card className={classes.infopanel} onClick={handleExpandClick}>
        <CardActions>
          <Typography className={classes.title}> {title} </Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ArrowDown />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>{children}</CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

ExpandableCard.defaultProps = {
  title: 'Climate Mind',
};

export default ExpandableCard;
