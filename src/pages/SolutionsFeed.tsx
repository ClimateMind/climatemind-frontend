import React from 'react';
import { useFeedData } from '../hooks/useFeedData';
import Wrapper from 'components/Wrapper';
import PageContent from 'components/PageContent';
import { COLORS } from 'common/styles/CMTheme';
import PageTitle from 'components/PageTitle';
import { CircularProgress } from '@material-ui/core';
import { SolutionsFeedCard } from 'components/SolutionsFeedCard/SolutionsFeedCard';

const SolutionsFeed = () => {
  const { solutionsFeedData } = useFeedData('solutions');

  return (
    <Wrapper bgColor={COLORS.ACCENT2} fullHeight>
      <PageContent>
        <PageTitle>Ready to take action?</PageTitle>
        {solutionsFeedData === undefined && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color="inherit" />
          </div>
        )}
        {solutionsFeedData?.map((solution, i) => (
          <SolutionsFeedCard key={i} index={i} solution={solution} />
        ))}
      </PageContent>
    </Wrapper>
  );
};

export default SolutionsFeed;
