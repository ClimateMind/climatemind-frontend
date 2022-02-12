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
import { useAlignment } from '../../../hooks/useAlignment';
import { useSharedImpacts } from '../../../hooks/useSharedImpacts';
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

interface SharedImpactsOverlayProps {
  imageUrl: string;
  description: string;
  sources: string[];
  selectAction: React.ReactNode;
}

const SharedImpactsOverlay: React.FC<SharedImpactsOverlayProps> = ({
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

const SharedImpacts: React.FC = () => {
  const classes = useStyles();
  const { push } = useHistory();
  const { alignmentScoresId } = useAlignment();
  const { sharedImpacts, isError, isLoading } = useSharedImpacts();

  useEffect(() => {
    console.log({ sharedImpacts });
  }, [sharedImpacts]);

  console.log({ alignmentScoresId });

  const handleNextSolutions = () => {
    push('/shared-solutions');
  };

  const handleSelectImpact = () => {
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

        <Wrapper bgColor={COLORS.SECTION3}>
          <PageSection>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <PageTitle>Climate impacts you and Stevie share</PageTitle>

                <Box textAlign="center">
                  <Typography variant="subtitle2">
                    Select one impact of climate change you’d be interested in
                    talking to Stevie about.
                  </Typography>
                </Box>

                <Box textAlign="center" pt={4} pb={4}>
                  <Typography variant="h6">
                    These topics already align with your shared core values, so
                    it’ll be easy to start having meaningful conversations.
                  </Typography>
                </Box>

                {sharedImpacts?.climateEffects?.map((effect, index) => (
                  <div
                    data-testid={`SharedImpactCard-${effect.effectId}-testid`}
                    key={index}
                  >
                    <Card
                      header={<CardHeader title={effect.effectTitle} />}
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
                          {effect.effectShortDescription}
                        </Typography>
                      </div>
                      {effect.relatedPersonalValues.map(
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
                  <Typography variant="button">Selected 0 of 1</Typography>
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
