import { useFeedData } from '../hooks/useFeedData';
import { ClimateApi } from '../api/ClimateApi';

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
