import {
    Box,
    Button,
    createStyles,
    Grid,
    makeStyles,
    Theme,
    Typography,
  } from '@material-ui/core';
  import React, { useEffect } from 'react';
  import { useHistory } from 'react-router-dom';
  import { ReactComponent as StepOneIcon } from '../../assets/step-one-icon.svg';
  import { ReactComponent as StepTwoIcon } from '../../../assets/step-two-icon.svg';
  import { COLORS } from '../../../common/styles/CMTheme';
  import { FooterAppBar } from '../../../components/FooterAppBar/FooterAppBar';
  import PageSection from '../../../components/PageSection';
  import PageTitle from '../../../components/PageTitle';
  import ROUTES_CONFIG from '../../../components/Router/RouteConfig';
  import Wrapper from '../../../components/Wrapper';
  import { useAlignment } from '../../../hooks/useAlignment';
  import { useSharedImpacts } from '../../../hooks/useSharedImpacts';
import Loader from '../../../components/Loader';
import Card from '../../../components/Card/Card';
import CardHeader from '../../../components/CardHeader';
import EffectOverlay from '../../../components/EffectOverlay';
import CardOverlay from '../../../components/CardOverlay';
import { Pil } from '../../../components/Pil';
import TabbedContent from '../../../components/TabbedContent';
import Paragraphs from '../../../components/Paragraphs';
import SourcesList from '../../../components/SourcesList';
  // import { useSession } from '../../../hooks/useSession';
  
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
  }

  const SharedImpactsOverlay: React.FC<SharedImpactsOverlayProps> = ({imageUrl, description, sources}) => {
    return (
      <CardOverlay iri="1" title="Overlay Title" imageUrl={imageUrl}>
        <TabbedContent
          details={
            <Box p={3}>
              <Paragraphs text={description} />
            </Box>
          }
          sources={<SourcesList sources={sources} />}
        />
      </CardOverlay>
    )
  }

  
  const SharedImpacts: React.FC = () => {
    const classes = useStyles();
    const { push } = useHistory();
    // const { alignmentId } = useAlignment();
    // const { alignmentScoresId } = useSession();
    const { alignmentScoresId } = useAlignment();
    const { sharedImpacts, isError, isLoading } = useSharedImpacts();

    useEffect(() => {
      console.log({ sharedImpacts });
    }, [sharedImpacts]);

    console.log( {alignmentScoresId} );
    
    const handleUserBTakesQuiz = () => {
      push(ROUTES_CONFIG.ROUTE_QUIZ);
    };
  
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
              
              {isLoading && <Loader />}
              
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
                        <SharedImpactsOverlay imageUrl={effect.imageUrl} description={effect.effectDescription} sources={effect.effectSources}/>
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
                <Button
                  style={{ border: '1px solid #07373B', marginRight: '8px' }}
                >
                  No Thanks
                </Button>
  
                <Button
                  variant="contained"
                  data-testid="take-quiz-userb-button"
                  color="primary"
                  disableElevation
                  style={{ border: '1px solid #a347ff', marginLeft: '8px' }}
                  onClick={handleUserBTakesQuiz}
                >
                  Take the Quiz
                </Button>
              </FooterAppBar>
            </PageSection>
          </Wrapper>
        </Grid>
      </main>
    );
  };
  
  export default SharedImpacts;
  