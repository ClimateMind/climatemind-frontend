import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { COLORS } from '../common/styles/CMTheme';
import Loader from '../components/Loader';
import Card from '../components/Card';
import PageWrapper from '../components/PageWrapper';
import CardHeader from '../components/CardHeader';
import CardOverlay from '../components/CardOverlay';
import { TActionNodeList } from '../types/Actions';

import { useClimateFeed } from '../hooks/useClimateFeed';

const dummyActionsData: TActionNodeList = [
  {
    actionType: 'prevention',
    title: 'Action Title 1',
    shortDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor, dolor sit amet, consectetur adipiscing…',
    imageUrl:
      'https://p0.pikist.com/photos/893/1014/friends-male-men-outside-winter-cold-bench-conversation-smile.jpg',
  },
  {
    actionType: 'prevention',
    title: 'Action Title 2',
    shortDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor, dolor sit amet, consectetur adipiscing…',
    imageUrl:
      'https://p0.pikist.com/photos/893/1014/friends-male-men-outside-winter-cold-bench-conversation-smile.jpg',
  },
];

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#70D7CC',
    minHeight: '100vh',
    padding: 0,
  },
  feedContainer: {
    padding: 0,
  },
  typography: {
    textAlign: 'center',
  },
});

const ClimateFeed: React.FC = () => {
  const classes = useStyles();
  const climateFeed = useClimateFeed();

  if (!climateFeed || !climateFeed.length) {
    return <Loader />;
  }
  return (
    <PageWrapper bgColor="#70D7CC" scroll={true}>
      <Grid
        container
        className={classes.root}
        data-testid="ClimateFeed"
        justify="space-around"
      >
        <Grid item sm={12} lg={12} className={classes.feedContainer}>
          {climateFeed.map((effect, i) => (
            <Card
              header={<CardHeader title={effect.effectTitle} index={i} />}
              key={`value-${i}`}
              index={i}
              shortDescription={effect.effectShortDescription}
              imageUrl={effect.imageUrl}
              actionHeadline={effect.actionHeadline}
              footer={
                <CardOverlay
                  title={effect.effectTitle}
                  imageUrl={effect.imageUrl}
                  shortDescription={effect.effectShortDescription}
                  description={effect.effectDescription}
                  actionNodes={dummyActionsData}
                />
              }
              preview={
                <CardHeader
                  title={effect.actionHeadline}
                  preTitle="Prevention Action"
                  bgColor={COLORS.YELLOW}
                  index={i}
                  cardIcon="prevention"
                />
              }
            />
          ))}
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default ClimateFeed;
