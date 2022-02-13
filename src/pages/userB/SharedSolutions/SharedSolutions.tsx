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
  import React, { useEffect } from 'react';
  import { useHistory } from 'react-router-dom';
  import { COLORS } from '../../../common/styles/CMTheme';
  import Card from '../../../components/Card/Card';
  import CardHeader from '../../../components/CardHeader';
  import CardOverlay from '../../../components/CardOverlay';
  import { FooterAppBar } from '../../../components/FooterAppBar/FooterAppBar';
  import Loader from '../../../components/Loader';
  import PageSection from '../../../components/PageSection';
  import PageTitle from '../../../components/PageTitle';
  import Paragraphs from '../../../components/Paragraphs';
  import { Pil } from '../../../components/Pil';
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
    const { sharedSolutions, isError, isLoading } = useSharedSolutions();
  
    useEffect(() => {
      console.log('sharedSolutions:', sharedSolutions);
    }, [sharedSolutions]);
    
    const handleNextSharing = () => {
      //TODO: add correct routing
      push('/path-to-sharing');
    };
  
    const handleSelectImpact = () => {
      // TODO: add select logic
      console.log('topic selected');
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
                  <PageTitle>Climate solutions for you and Stevie</PageTitle>
  
                  <Box textAlign="center">
                    <Typography variant="subtitle2">
                      Here are some solutions we’d think you’d be interested in based on your shared core values.
                    </Typography>
                  </Box>
  
                  <Box textAlign="center" pt={4} pb={4}>
                    <Typography variant="h6">
                      Select two solutions to share with Stevie so you can act together!
                    </Typography>
                  </Box>
  
                  {sharedSolutions?.climateSolutions?.map((solution, index) => (
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
                                  <Checkbox onChange={handleSelectImpact} />
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
                        {solution.relatedPersonalValues.map(
                          (relPersonalVal, ind) => (
                            <>
                              <Pil
                                text={relPersonalVal.personalValue}
                                key={ind}
                              ></Pil>
                            </>
                          )
                        )}
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
  