import React from 'react';

import { useFeedData } from 'hooks/useFeedData';
import { COLORS } from 'common/styles/CMTheme';
import Wrapper from 'components/Wrapper';
import PageTitle from 'components/PageTitle';
import PageContent from 'components/PageContent';
import { SolutionsFeedCard } from 'components/SolutionsFeedCard/SolutionsFeedCard';
import { CircularProgress } from '@material-ui/core';

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
