import { useEffect, useState } from 'react';
import { CM_COLOURS } from 'const/colors';
import HelpIcon from '@mui/icons-material/Help';

import { CmButton2, CmTextInput, CmTypography, Page } from 'shared/components';
import { ConversationsDrawer, CopyLinkModal, useConversationInvite, useConversations } from 'features/conversations';
import { useLocation, useSearchParams } from 'react-router-dom';
import { BorderLinearProgress } from 'shared/components/BorderLinearProgress';
import { CmBadge } from 'shared/components/CmBadge';
import CmGoalCard from 'shared/components/CmRoundedCard';
import CmRoundedCard from 'shared/components/CmRoundedCard';
import { CheckCircle, HourglassTopOutlined } from '@mui/icons-material';
import CmTextWithIcon from 'shared/components/CmTextWithIcon';

function ConversationsPage() {
  const location = useLocation();
  const [searchParams, _] = useSearchParams();
  const badges = Array(4).fill({ name: 'badge name' });

  const { isLoading, conversations } = useConversations();

  const getConversations = (status: 'complete' | 'ongoing') => {
    if (status === 'complete') {
      return conversations?.filter((conversation) => conversation.state === 5);
    }
    return conversations?.filter((conversation) => conversation.state !== 5);
  };

  useEffect(() => {
    console.log(isLoading);
  }, []);

  // Logic for create link
  const { inviteToConversation } = useConversationInvite();
  const [showCopyLinkModal, setShowCopyLinkModal] = useState(false);
  const [friendsName, setFriendsName] = useState('');
  const [link, setLink] = useState('');

  const [conversationDrawerOpen, setConversationDrawerOpen] = useState(false);

  async function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();

    const link = await inviteToConversation(friendsName);
    if (link) {
      setLink(link);
      setShowCopyLinkModal(true);
      setFriendsName('');
    }
  }

  useEffect(() => {
    if (location.state?.id || searchParams.get('conversation')) {
      setConversationDrawerOpen(true);
    }
  }, []);

  return (
    <Page>
      <div style={styles.root}>
        <div style={styles.topPageSection}>
          <CmTypography style={{ color: '#FDFFFC' }} variant="h2">
            Conversation Hub
          </CmTypography>
          <div style={styles.imageBanner}>
            <img src="/hompage-conversation.svg" alt="cm conversation image" style={styles.image} />
            <div content="" style={styles.HorizontalDivider}></div>
          </div>
          <div style={styles.conversationInputContainer}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CmTypography style={{ color: '#FDFFFC' }} variant="h3">
                  Create a link to get started!
                </CmTypography>
                <HelpIcon sx={{ color: CM_COLOURS.white, fontSize: 26 }} />
              </div>
            </div>
            <CmTypography style={{ color: '#FDFFFC', paddingBottom: '16px' }} variant="body">
              Share this link with a friend so they can take the Values Quiz and select topics to discuss! We will email you when they share their results.
            </CmTypography>
            <CmRoundedCard customStyles={{ boxShadow: '0px 4px 8px 0px #D0EEEB', padding: '16px', gap: 17 }}>
              <form onSubmit={handleSubmit} style={styles.form}>
                <CmTextInput
                  variant="outlined"
                  id="friend"
                  label="Name"
                  placeholder='Try "Peter Smith" or "Mom"'
                  value={friendsName}
                  onChange={(e) => setFriendsName(e.target.value)}
                  helperText={friendsName.length > 20 && 'Name must be less than 20 characters'}
                  style={{ borderRadius: '10px' }}
                />

                <CmButton2 style={{ marginTop: '20px' }} text="Create Link" onClick={() => handleSubmit} disabled={friendsName === '' || friendsName.length > 20} />
              </form>
            </CmRoundedCard>
          </div>
          <ConversationsDrawer open={conversationDrawerOpen} onClose={() => setConversationDrawerOpen(false)} />

          <CopyLinkModal isOpen={showCopyLinkModal} onClose={() => setShowCopyLinkModal(false)} userBName={friendsName} link={link} />
        </div>

        {/* lower section */}
        <div style={styles.lowerSection}>
          <div style={styles.lowerSectionContainer}>
            <CmTypography style={styles.textLeft} variant="h2">
              Your Conversations
            </CmTypography>

            {!conversations || conversations.length == 0 ? (
              <CmTypography style={styles.textLeft} variant="body">
                You do not currently have any conversations. Create a quiz link and send it to a friend to get started!
              </CmTypography>
            ) : null}

            <div style={{ marginTop: '64px' }}>
              <CmTypography style={styles.textLeft} variant="h4">
                Ongoing
              </CmTypography>

              {getConversations('ongoing')?.map((conversation) => (
                <CmGoalCard customStyles={{ marginBottom: '16px' }} key={conversation.conversationId} conversationStatus="ongoing">
                  <div style={{ ...styles.conversationCardContainer, ...{ height: '162px' } }}>
                    <CmTypography style={styles.textLeft} variant="h1">
                      {conversation.userB.name}
                    </CmTypography>
                    <div>
                      <CmTextWithIcon text="Link Created" icon={conversation.state >= 0 && conversation.state <= 5 ? <CheckCircle /> : <HourglassTopOutlined />} />
                      <CmTextWithIcon text="Topics Selected" icon={conversation.state == 0 ? <HourglassTopOutlined /> : <CheckCircle />} />
                      <CmTextWithIcon text="Talked" icon={<HourglassTopOutlined />} />
                    </div>
                  </div>
                </CmGoalCard>
              ))}
            </div>

            <div style={{ marginTop: '64px' }}>
              <CmTypography style={styles.textLeft} variant="h4">
                Completed
              </CmTypography>
              {getConversations('complete')?.map((conversation) => (
                <CmGoalCard customStyles={{ marginBottom: '16px' }} key={conversation.conversationId} conversationStatus="completed">
                  <div style={styles.conversationCardContainer}>
                    <CmTypography style={styles.textLeft} variant="h1">
                      {conversation.userB.name}
                    </CmTypography>
                    <div>
                      <CmTypography variant="h4">Completed</CmTypography>
                    </div>
                  </div>
                </CmGoalCard>
              ))}
            </div>

            <div>
              <CmTypography style={{ marginTop: '64px', textAlign: 'left' }} variant="h2">
                Weekly Goal
              </CmTypography>
              <CmRoundedCard customStyles={styles.weeklyGoal}>
                <div style={styles.weeklyGoalTopSection}>
                  <img style={styles.weeklyGoalImage} src="/weekly-goal.svg" alt="cm weely goals" />
                  <div style={{ padding: '10px' }}>
                    <CmTypography variant="h4" style={styles.weeklyGoalTitle}>
                      Almost there!
                    </CmTypography>
                    <CmTypography style={{ textAlign: 'left' }} variant="body">
                      Reach out to a friend or family member to start talking!
                    </CmTypography>
                  </div>
                </div>
                <div style={{ margin: '16px 0px' }}>
                  <CmTypography style={{ textAlign: 'right' }} variant="body">
                    <span style={{ fontWeight: 'bolder' }}>0/1</span> Conversations
                  </CmTypography>
                  <BorderLinearProgress style={styles.progressBar} variant="determinate" value={50} />
                </div>
              </CmRoundedCard>

              <div style={styles.resourcesArea}>
                <CmTypography style={{ textAlign: 'center', paddingBottom: '32px' }} variant="body">
                  Want more guidance on how to have great conversations?
                </CmTypography>
                <CmButton2 style={styles.resourcesButton} text="Resources" onClick={() => handleSubmit} />
              </div>

              <div>
                <div style={styles.badgeSectionHeader}>
                  <CmTypography style={styles.textLeft} variant="h4">
                    Your Climate Badges
                  </CmTypography>
                  <CmTypography style={{ textDecoration: 'underline' }} variant="body">
                    SEE ALL
                  </CmTypography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  {badges.map((badgeInfo) => (
                    <div>
                      <CmBadge name={badgeInfo.name} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    maxWidth: 640,
    margin: '0 auto',
  },
  topPageSection: { backgroundColor: CM_COLOURS.mainDarkGreen, padding: '8px 8px 32px 8px' },
  lowerSection: {
    background: 'linear-gradient(180deg, #FFFFFF 78.34%, rgba(208, 238, 235, 0.6) 141.86%)',
    paddingBottom: '128px',
    width: "100%",
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  openDrawerButton: {
    backgroundColor: '#D0EEEB',
    border: 'none',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100vw',
    height: 88,
  },
  imageBanner: { width: '280px', height: '265px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minWidth: '100%' },
  image: { display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  HorizontalDivider: { border: '1px solid #BDFADC', width: '188px', alignSelf: 'center' },
  lowerSectionContainer: { margin: '16px', marginTop: '64px' },
  weeklyGoal: { display: 'flex', flexDirection: 'column', background: '#F5ECFE', boxShadow: '0px 4px 8px 0px #00000040', border: '1px solid #D0EEEB' },
  weeklyGoalTopSection: { display: 'flex', alignItems: 'center' },
  weeklyGoalImage: { width: '105px', height: '100px' },
  weeklyGoalTitle: { padding: '0px', margin: '0px', textAlign: 'left' },
  textLeft: { textAlign: 'left' },
  resourcesArea: { display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: '64px 32px' },
  resourcesButton: { backgroundColor: 'white', border: '1px solid #07373B', boxShadow: '0px 4px 4px 0px #00000040' },
  conversationCardContainer: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badgeSectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  progressBar: { margin: '16px 0px', backgroundColor: 'white' },
  conversationInputContainer: { display: 'flex', justifyContent: 'center', padding: '16px 16px 0px 16px', flexDirection: 'column' },
};

export default ConversationsPage;
