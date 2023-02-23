import React from 'react';

import { useFeedData } from 'hooks/useFeedData';
import Loader from 'components/Loader';
import { COLORS } from 'common/styles/CMTheme';
import Wrapper from 'components/Wrapper';
import PageTitle from 'components/PageTitle';
import PageContent from 'components/PageContent';
import { SolutionsFeedCard } from 'components/SolutionsFeedCard/SolutionsFeedCard';

const SolutionsFeed = () => {
  const { solutionsFeedData } = useFeedData('solutions');

  return (
    <Wrapper bgColor={COLORS.ACCENT2} fullHeight>
      <PageContent>
        <PageTitle>Ready to take action?</PageTitle>
        {solutionsFeedData === undefined ?? <Loader />}
        {solutionsFeedData?.map((solution, i) => (
          <SolutionsFeedCard key={i} index={i} solution={solution} />
        ))}
      </PageContent>
    </Wrapper>
  );
};

export default SolutionsFeed;
