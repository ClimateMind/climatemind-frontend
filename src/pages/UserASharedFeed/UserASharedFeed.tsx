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
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
// import {
//     postSharedSolutions,
//     TChoosenSharedSolution,
// } from '../../../api/postSharedSolutions';
import { COLORS } from '../../common/styles/CMTheme';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/CardHeader';
import CardOverlay from '../../components/CardOverlay';
import { FooterAppBar } from '../../components/FooterAppBar/FooterAppBar';
import Loader from '../../components/Loader';
import PageSection from '../../components/PageSection';
import PageTitle from '../../components/PageTitle';
import Paragraphs from '../../components/Paragraphs';
import SourcesList from '../../components/SourcesList';
import TabbedContent from '../../components/TabbedContent';
import Wrapper from '../../components/Wrapper';
import Error500 from '../Error500';
import ScrollToTopOnMount from '../../components/ScrollToTopOnMount';
import getSelectedTopics from '../../api/getSelectedTopics';
import { useGetOneConversation } from '../../hooks/useGetOneConversation';
import getSolutionDetails from '../../api/getSolutionDetails';
import getImpactDetails from '../../api/getImpactDetails';
import { Pil } from '../../components/Pil';
import { SharedSolutionsOverlay } from '../userB/SharedSolutions/SharedSolutions';
import { SharedImpactsOverlay } from '../userB/SharedImpacts/SharedImpacts';

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
// interface SharedImpactsOverlayProps {
//   impactIri: string;
//   selectAction: React.ReactNode;
// }

// const SharedImpactsOverlay: React.FC<SharedImpactsOverlayProps> = ({
//   impactIri,
//   selectAction,
// }) => {
//   const { data, isSuccess } = useQuery(['impactDetails', impactIri], () => {
//     if (impactIri) {
//       return getImpactDetails(impactIri);
//     }
//   });

//   return (
//     <div>
//       {isSuccess && (
//         <div style={{ marginTop: '-20px' }}>
//           <CardOverlay
//             iri="1"
//             title="Overlay Title"
//             cardHeader={<CardHeader title={data?.effectTitle} />}
//             imageUrl={data?.imageUrl}
//             selectAction={selectAction}
//           >
//             <TabbedContent
//               details={
//                 <Box p={3}>
//                   <Paragraphs text={data?.longDescription} />
//                   <Box mt={3}>
//                     {data?.relatedPersonalValues.map((pv, index) => (
//                       <Pil key={`${pv}-${index}`} text={pv}></Pil>
//                     ))}
//                   </Box>
//                 </Box>
//               }
//               sources={<SourcesList sources={data?.effectSources} />}
//             />
//           </CardOverlay>
//         </div>
//       )}
//     </div>
//   );
// };

type UrlParamType = {
  conversationId: string;
};

const UserASharedFeed: React.FC = () => {
  const classes = useStyles();
  const { push } = useHistory();

  useEffect(()=>{
    console.log('conversationId', conversationId);
  },[]);
  
  const { conversationId } =  useParams<UrlParamType>();

  const { conversation } = useGetOneConversation(conversationId);

  const { data, isLoading, isSuccess } = useQuery(
    ['selectedTopics', conversationId],
    () => {
      if (conversationId) {
        return getSelectedTopics(conversationId);
      }
    }
  );

  useEffect(() => {
    console.log('selected topics data', data);
  },[data]);

  const labelStyles = {
    fontSize: '10px',
    fontFamily: 'Bilo',
    fontWeight: 500,
    lineHeight: '10px',
    maxWidth: '40px',
  };



  return (
    <main>
      <ScrollToTopOnMount />
      <Grid
        container
        className={classes.root}
        data-testid="PersonalValues"
        justifyContent="space-around"
      >
        {/* --- */}

        <Wrapper bgColor={COLORS.SECONDARY}>
          <PageSection>
           {isLoading ? (
              <Loader />
            ) : ( 
              <>
                <PageTitle>Your shared feed with {conversation?.userB?.name}</PageTitle>

                <Box textAlign="center">
                  <Typography variant="subtitle2">
                   These are climate effects that matter to you  both; great starting point for 
                   having a constructive conversation.
                  </Typography>
                </Box>

                {data?.climateEffects.map((effect, index) => (
                  <div 
                    data-testid={`TopicsEffectCard-${effect.effectId}-testid`}
                    key={index}
                  >
                     <Card
                      header={
                        <CardHeader 
                          title={effect.effectTitle} 
                          preTitle={
                            effect?.isPossiblyLocal ? 'Local impact' : ''
                          }
                        />}
                      index={index}
                      imageUrl={effect.imageUrl}                        
                      footer={
                        <SharedImpactsOverlay
                          impactIri={effect.effectId}
                          selectAction={<></>}
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
                          <Pil text={relPersonalVal} key={ind}></Pil>
                        )
                      )}
                    </Card>
                  </div>
                ))} 
                
                {data?.climateSolutions.map((solution, index) => (
                  <div 
                    data-testid={`TopicsSolutionCard-${solution.solutionId}-testid`}
                    key={index}
                  >
                    <Card
                      header={<CardHeader title={solution.solutionTitle} />}
                      index={index}
                      imageUrl={solution.imageUrl}
                     
                      footer={
                        <SharedSolutionsOverlay
                          solutionIri={solution.solutionId}
                          selectAction={
                           <></>
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

                                  


              </>
            )}
          </PageSection>
        </Wrapper>
      </Grid>
    </main>
  );
};

export default UserASharedFeed;

