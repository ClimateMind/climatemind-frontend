import {
    Box,
    Button,
    Checkbox,
    createStyles,
    FormControlLabel,
    Grid,
    makeStyles,
    Typography,
  } from '@material-ui/core';
  import React, { useState } from 'react';
  import { useMutation } from 'react-query';
  import { useHistory } from 'react-router-dom';
  import { postSharedSolutions, TChoosenSharedSolution } from '../../../api/postSharedSolutions';
  import { COLORS } from '../../../common/styles/CMTheme';
  import Card from '../../../components/Card/Card';
  import CardHeader from '../../../components/CardHeader';
  import CardOverlay from '../../../components/CardOverlay';
  import { FooterAppBar } from '../../../components/FooterAppBar/FooterAppBar';
  import Loader from '../../../components/Loader';
  import PageSection from '../../../components/PageSection';
  import PageTitle from '../../../components/PageTitle';
  import Paragraphs from '../../../components/Paragraphs';
  import SourcesList from '../../../components/SourcesList';
  import TabbedContent from '../../../components/TabbedContent';
  import Wrapper from '../../../components/Wrapper';
  import { useSharedSolutions } from '../../../hooks/useSharedSolutions';
  import Error500 from '../../Error500';
  
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        minHeight: '100vh',
      },
      typography: {
        textAlign: 'center',
      },
      upper: {
        textTransform: 'uppercase',
        letterSpacing: '1pt',
        fontSize: '10px',
        fontWeight: 500,
      },
    })
  );
  
  interface SharedSolutionsOverlayProps {
    imageUrl: string;
    description: string;
    sources: string[];
    selectAction: React.ReactNode;
  }
  
  const SharedSolutionsOverlay: React.FC<SharedSolutionsOverlayProps> = ({
    imageUrl,
    description,
    sources,
    selectAction,
  }) => {
    return (
      <div style={{ marginTop: '-20px' }}>
        <CardOverlay
          iri="1"
          title="Overlay Title"
          imageUrl={imageUrl}
          selectAction={selectAction}
        >
          <TabbedContent
            details={
              <Box p={3}>
                <Paragraphs text={description} />
              </Box>
            }
            sources={<SourcesList sources={sources} />}
          />
        </CardOverlay>
      </div>
    );
  };
  
  const SharedSolutions: React.FC = () => {
    const classes = useStyles();
    const { push } = useHistory();
    const { solutions, userAName, isError, isLoading } = useSharedSolutions();

    const alignmentScoresId = '2623db3e-3059-40c4-8da7-f79c39e719ee';
    const initSolutionIds = [ 
      {
      solutionId: "R8WxponQcYpGf2zDnbsuVxG"
    },
    {
      solutionId: "RCg7BxIR9BolygeacF635tH"
    }];
    const [solutionIds, setSolutionIds] = useState<TChoosenSharedSolution[]>(initSolutionIds);

    const mutateChooseSharedSolutions = useMutation(
      (data: { solutionIds: TChoosenSharedSolution[]; alignmentScoresId: string }) =>
        postSharedSolutions({solutionIds, alignmentScoresId}),
        {
          onSuccess: (response: { message: string}) => {
            if(process.env.NODE_ENV === 'development'){
              console.log(response.message);
            }
          },
          onError: (error: any) => {
           
          },
        }
    );

    const handleNextSharing = () => {
      mutateChooseSharedSolutions.mutate({solutionIds, alignmentScoresId});
      //TODO: add correct routing
      //push('/path-to-sharing');
    };
  
    const handleSelectSolution = (e: React.ChangeEvent<HTMLInputElement>, solutionId: string) => {
      console.log('topic selected checked', e.target.checked);
      console.log('topic selected effectId', solutionId);
      // TODO: add select logic
    };
  
    const labelStyles = {
      fontSize: '10px',
      fontFamily: 'Bilo',
      fontWeight: 500,
      lineHeight: '10px',
      maxWidth: '40px',
    };
  
    const actionStyles = {
      marginBottom: '-0.5em',
    };
  
    if (isError) return <Error500 />;
  
    return (
      <main>
        <Grid
          container
          className={classes.root}
          data-testid="PersonalValues"
          justify="space-around"
        >
          {/* --- */}
  
          <Wrapper bgColor={COLORS.SECTION4}>
            <PageSection>
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <PageTitle>Climate solutions for you and {userAName}</PageTitle>
  
                  <Box textAlign="center">
                    <Typography variant="subtitle2">
                      Here are some solutions we’d think you’d be interested in based on your shared core values.
                    </Typography>
                  </Box>
  
                  <Box textAlign="center" pt={4} pb={4}>
                    <Typography variant="h6">
                      Select two solutions to share with {userAName} so you can act together!
                    </Typography>
                  </Box>
  
                  {solutions?.map((solution, index) => (
                    <div
                      data-testid={`SharedSolutionsCard-${solution.solutionId}-testid`}
                      key={index}
                    >
                      <Card
                        header={<CardHeader title={solution.solutionTitle} />}
                        index={index}
                        imageUrl={solution.imageUrl}
                        footer={
                          <SharedSolutionsOverlay
                            imageUrl={solution.imageUrl}
                            description={solution.solutionDescription}
                            sources={solution.solutionSources}
                            selectAction={
                              <FormControlLabel
                                value="Select"
                                control={
                                  <Checkbox onChange={(e) => handleSelectSolution(e, solution.solutionId)} />
                                }
                                label={
                                  <>
                                    <Typography style={labelStyles}>
                                      SELECT
                                    </Typography>
                                    <Typography style={labelStyles} align="right">
                                      TOPIC
                                    </Typography>
                                  </>
                                }
                                labelPlacement="start"
                                style={actionStyles}
                              />
                            }
                          />
                        }
                      >
                        <div style={{ marginBottom: '16px' }}>
                          <Typography variant="body1">
                            {solution.solutionShortDescription}
                          </Typography> 
                        </div>
                      </Card>
                    </div>
                  ))}
  
                  <FooterAppBar bgColor={COLORS.ACCENT10}>
                    <Typography variant="button">Selected 0 of 2</Typography>
                    <Button
                      variant="contained"
                      data-testid="next-sharing-button"
                      color="primary"
                      disableElevation
                      style={{ border: '1px solid #a347ff', marginLeft: '8px' }}
                      onClick={handleNextSharing}
                    >
                      Next: Sharing
                    </Button>
                  </FooterAppBar>
                </>
              )}
            </PageSection>
          </Wrapper>
        </Grid>
      </main>
    );
  };
  
  export default SharedSolutions;
  