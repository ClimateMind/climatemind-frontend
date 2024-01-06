import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { COLORS } from '../../common/styles/CMTheme';
import ROUTES_CONFIG from '../../router/RouteConfig';
import { basicHumanValuesUrl } from '../../shareSettings';
import { useUserB } from '../../hooks/useUserB';
import { CmButton, CmTypography, Page, PageContent, PageSection } from 'shared/components';
import { FooterAppBar } from '../../features/userB/components';

function UserBHowCMWorksPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { conversationId } = useUserB();

  useEffect(() => {
    console.log('HowCMWorks...', conversationId);
    //TODO: we need to pass conversationId to questionnarie to distinguish userB journey from userA's
  }, [conversationId]);

  const handleUserBTakesQuiz = () => {
    navigate(`${ROUTES_CONFIG.QUIZ_PAGE}/${conversationId}`, {
      state: { from: location.pathname, id: conversationId },
    });
  };

  const handleNoThanks = () => {
    navigate(`${ROUTES_CONFIG.USERB_NO_CONSENT_PAGE}/${conversationId}`, {
      ...location.state,
      prevLocation: `${ROUTES_CONFIG.USERB_HOW_CM_WORKS_PAGE}`,
    });
  };

  const handleNavAway = (url: string) => {
    window.open(url);
  };

  return (
    <Page>
      <PageSection>
        <PageContent style={{ textAlign: 'center' }}>
          <CmTypography variant='h1'>How does Climate Mind work?</CmTypography>

          <CmTypography variant="h3" style={{ margin: 0 }}>Step 1</CmTypography>
          <CmTypography variant="h3" style={{ margin: 0 }}>Take a quiz</CmTypography>

          <img src={'/userb-step-one.svg'} alt="Step One Icon" style={{ marginTop: 15, marginBottom: 15}} />
          <CmTypography variant="body" style={{ marginBottom: 40 }}>Discover your core values and see which values make you tick.</CmTypography>

          <CmTypography variant="h3" style={{ margin: 0 }}>Step 2</CmTypography>
          <CmTypography variant="h3" style={{ margin: 0 }}>See how you and your friends align</CmTypography>

          <img src={'/userb-step-two.svg'} alt="Step Two Icon" style={{ marginTop: 15, marginBottom: 15 }} />
          <CmTypography variant="body" style={{ marginBottom: 40 }}>Understand how your shared values can help frame conversations and climate change action.</CmTypography>

          <CmTypography variant="h3" style={{ margin: 0 }}>Step 3</CmTypography>
          <CmTypography variant="h3" style={{ margin: 0 }}>Connect, learn, and act on common interests together</CmTypography>

          <img src={'/userb-step-three.svg'} alt="Step Three Icon" style={{ marginTop: 15, marginBottom: 15 }} />
          <CmTypography variant="body" style={{ marginBottom: 40 }}>
            Share climate conversation topics and solutions that align with
            you and your friend’s shared values to make collective action
            easier and more comfortable.
          </CmTypography>

          <img src={'/userb-step-four.svg'} alt="Step Four Icon" style={{ marginBottom: 15 }} />
          <CmTypography variant="body">Create an account, invite others, and track your progress.</CmTypography>
        </PageContent>
      </PageSection>

      <PageSection style={{ backgroundColor: 'white', paddingBottom: 200 }}>
        <PageContent style={{ textAlign: 'center' }}>
          <img src={'/arrows/arrow-down-purple.svg'} alt="Arrow down icon" style={{ marginTop: 10, marginBottom: 10 }} />
          <CmTypography variant='overline'>Further Reading</CmTypography>

          <CmTypography variant='h1'>What is the core values quiz?</CmTypography>

          <CmTypography variant="body" style={{ marginTop: 20, marginBottom: 20 }}>
            A 10 question multiple choice quiz to discover which guiding
            life principles are most important to you.
          </CmTypography>

          <CmTypography variant="body">
            These guiding life principles are your core values and each
            value holds a varying degree of importance for you.
          </CmTypography>

          <CmButton
            color='userb'
            text="Learn More"
            startIcon={<OpenInNewIcon fontSize="small" />}
            onClick={() => handleNavAway(basicHumanValuesUrl)}
            style={{ marginTop: 40 }}
          />
        </PageContent>
      </PageSection>

      <FooterAppBar bgColor={COLORS.ACCENT10}>
        <CmButton text='No Thanks' onClick={handleNoThanks} style={{ backgroundColor: 'transparent', borderColor: 'black' }} />
        <CmButton color='userb' text='Take the Quiz' onClick={handleUserBTakesQuiz} />
      </FooterAppBar>
    </Page>
  );
}

export default UserBHowCMWorksPage;
