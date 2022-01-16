import {
    Box,
    Button,
    Checkbox,
    createStyles,
    FormControlLabel,
    Grid,
    makeStyles,
    Theme,
    Typography,
  } from '@material-ui/core';
  import React from 'react';
  import { useHistory } from 'react-router-dom';
  import { COLORS } from '../../../common/styles/CMTheme';
  import { FooterAppBar } from '../../../components/FooterAppBar/FooterAppBar';
  import PageSection from '../../../components/PageSection';
  import PageTitle from '../../../components/PageTitle';
  // import ROUTES_CONFIG from '../../../components/Router/RouteConfig';
  import Wrapper from '../../../components/Wrapper';
  import { useSharedImpacts } from '../../../hooks/useSharedImpacts';
  import Loader from '../../../components/Loader';
  import Card from '../../../components/Card/Card';
  import CardHeader from '../../../components/CardHeader';
  import CardOverlay from '../../../components/CardOverlay';
  import { Pil } from '../../../components/Pil';
  import TabbedContent from '../../../components/TabbedContent';
  import Paragraphs from '../../../components/Paragraphs';
  import SourcesList from '../../../components/SourcesList';
  
  const useStyles = makeStyles((theme: Theme) =>
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

  interface SharedImpactsOverlayProps {
    imageUrl: string;
    description: string;
    sources: string[];
    selectAction: React.ReactNode;
  }

  const SharedImpactsOverlay: React.FC<SharedImpactsOverlayProps> = ({imageUrl, description, sources, selectAction}) => {
    return (
      <div style={{marginTop: '-20px'}}>
      <CardOverlay iri="1" title="Overlay Title" imageUrl={imageUrl} selectAction={selectAction}>
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
    )
  }

  
  const SharedImpacts: React.FC = () => {
    const classes = useStyles();
    const { push } = useHistory();
    const { sharedImpacts, isLoading } = useSharedImpacts();
    
    const handleNextSolutions = () => {
      //TODO: add to config 
      push('/shared-solutions');
    };

    const handleSelectImpact = () => {
      // TODO: add select logic
      console.log('topic selected');
    }
  
    const labelStyles = {
      fontSize: '10px',
      fontFamily: 'Bilo',
      fontWeight: 500,
      lineHeight: '10px',
      maxWidth: '40px',
    };

    const actionStyles = {
      marginBottom: '-0.5em',
    }

    return (
      <main>
        <Grid
          container
          className={classes.root}
          data-testid="PersonalValues"
          justify="space-around"
        >
          {/* --- */}
  
          <Wrapper bgColor={COLORS.SECTION3}>
            <PageSection>
              {isLoading ? (<Loader />) : (
                <>
                  <PageTitle>Climate impacts you and Stevie share</PageTitle>
      
                  <Box textAlign="center">
                    <Typography variant="subtitle2">
                      Select one impact of climate change you’d be interested in talking to Stevie about.
                    </Typography>
                  </Box>
                  
                  <Box textAlign="center" pt={4}  pb={4}>
                    <Typography variant="h6">
                      These topics already align with your shared core values, so it’ll be easy to start having meaningful conversations.
                    </Typography>
                  </Box>
      
                  {sharedImpacts?.climateEffects?.map( (effect, index) => (
                    <div
                      data-testid={`SharedImpactCard-${effect.effectId}-testid`}
                      key={index}
                    >
                      <Card
                          header={
                            <CardHeader
                              title={effect.effectTitle}                          
                            />
                          }
                          index={index}
                          imageUrl={effect.imageUrl}
                          footer={
                            <SharedImpactsOverlay 
                              imageUrl={effect.imageUrl} 
                              description={effect.effectDescription} 
                              sources={effect.effectSources}
                              selectAction={
                                <FormControlLabel
                                  value="Select"
                                  control={<Checkbox onChange={handleSelectImpact}/>}
                                  label={
                                    <>
                                      <Typography style={labelStyles}>SELECT</Typography>
                                      <Typography style={labelStyles} align="right">TOPIC</Typography>
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
                              {effect.effectShortDescription}
                            </Typography>
                          </div>
                          {effect.relatedPersonalValues.map((relPersonalVal, ind) => (
                            <>
                              <Pil text={relPersonalVal.personalValue} key={ind}></Pil>
                            </>
                          ))}
                        </Card>
                    </div>
                  ))}

                  <FooterAppBar bgColor={COLORS.ACCENT10}>
                    <Typography variant="button">
                      Selected 0 of 1
                    </Typography>
                    <Button
                      variant="contained"
                      data-testid="next-solutions-button"
                      color="primary"
                      disableElevation
                      style={{ border: '1px solid #a347ff', marginLeft: '8px' }}
                      onClick={handleNextSolutions}
                    >
                      Next: Solutions
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
  
  export default SharedImpacts;
  