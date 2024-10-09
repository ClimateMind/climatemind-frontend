import { useEffect, useState } from 'react';
import { CM_COLOURS } from 'const/colors';
import HelpIcon from '@mui/icons-material/Help';

import { CmButton2, CmTextInput, CmTypography, Page, PageSection } from 'shared/components';
import { ConversationsDrawer, CopyLinkModal, useConversationInvite } from 'features/conversations';
import { Card } from '@mui/material';
import { useLocation, useSearchParams } from 'react-router-dom';
import { BorderLinearProgress } from 'shared/components/BorderLinearProgress';
import { CmBadge } from 'shared/components/CmBadge';

function ConversationsPage() {
  const location = useLocation();
  const [searchParams, _] = useSearchParams();
  const badges = Array(4).fill({name: "badge name"});

  // Logic for create link
  const { inviteToConversation } = useConversationInvite();
  const [showCopyLinkModal, setShowCopyLinkModal] = useState(false);
  const [friendsName, setFriendsName] = useState('');
  const [link, setLink] = useState('');
  console.log(link);

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
        <PageSection style={{ backgroundColor: CM_COLOURS.mainDarkGreen, padding: '32px' }}>
          <CmTypography style={{ color: '#FDFFFC' }} variant="h2">
            Conversation Hub
          </CmTypography>
          <div style={styles.imageBanner}>
            <img src="/hompage-conversation.svg" alt="cm conversation image" style={styles.image} />
            <div content="" style={styles.HorizontalDivider}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 16px 0px 16px', flexDirection: 'column' }}>
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
            <Card sx={{ padding: '20px 30px', borderRadius: '20px', boxShadow: '0px 4px 8px 0px #D0EEEB' }}>
              <form onSubmit={handleSubmit} style={styles.form}>
                <CmTextInput
                  id="friend"
                  label="Name of recipient"
                  placeholder='Try "Peter Smith" or "Mom"'
                  value={friendsName}
                  onChange={(e) => setFriendsName(e.target.value)}
                  helperText={friendsName.length > 20 && 'Name must be less than 20 characters'}
                />

                <CmButton2 style={{ margin: '20px' }} text="Create Link" onClick={() => handleSubmit} disabled={friendsName === '' || friendsName.length > 20} />
              </form>
            </Card>
          </div>
          <ConversationsDrawer open={conversationDrawerOpen} onClose={() => setConversationDrawerOpen(false)} />

          <CopyLinkModal isOpen={showCopyLinkModal} onClose={() => setShowCopyLinkModal(false)} userBName={friendsName} link={link} />
        </PageSection>

        {/* lower section */}
        <div style={styles.lowerSection}>
          <div style={{ margin: '16px', marginTop: '64px' }}>
            <CmTypography style={styles.textLeft} variant="h2">
              Your Conversations
            </CmTypography>

            <div style={{ marginTop: '64px' }}>
              <CmTypography style={styles.textLeft} variant="h4">
                Ongoing
              </CmTypography>
              <CmTypography style={styles.textLeft} variant="body">
                You do not currently have any conversations. Create a quiz link and send it to a friend to get started!
              </CmTypography>
            </div>

            <div style={{ marginTop: '64px' }}>
              <CmTypography style={styles.textLeft} variant="h4">
                Completed
              </CmTypography>
              <Card sx={{ padding: '20px 30px', borderRadius: '20px', boxShadow: '0px 4px 4px 0px #00000040', background: 'linear-gradient(90.41deg, #FFFFFF -21.97%, rgba(255, 199, 39, 0.9) 96.54%)' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <CmTypography style={styles.textLeft} variant="h1">
                    Kameron
                  </CmTypography>
                  <CmTypography style={styles.textLeft} variant="h4">
                    Completed
                  </CmTypography>
                </div>
              </Card>
            </div>
            <div>
              <CmTypography style={{ marginTop: '64px', textAlign: 'left' }} variant="h2">
                Weekly Goal
              </CmTypography>
              <Card sx={styles.weeklyGoal}>
                <div style={styles.weeklyGoalTopSection}>
                  <img style={styles.weeklyGoalImage} src="/weekly-goal.svg" alt="cm weely goals" />
                  <div style={{ padding: '10px' }}>
                    <CmTypography variant="h4" style={{ padding: '0px', margin: '0px', textAlign: 'left' }}>
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
                  <BorderLinearProgress style={{ margin: '16px 0px', backgroundColor: 'white' }} variant="determinate" value={50} />
                </div>
              </Card>

              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: '64px 32px' }}>
                <CmTypography style={{ textAlign: 'center', paddingBottom: '32px' }} variant="body">
                  Want more guidance on how to have great conversations?
                </CmTypography>
                <CmButton2 style={{ backgroundColor: 'white' }} text="Resources" onClick={() => handleSubmit} />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <CmTypography style={styles.textLeft} variant="h4">
                    Your Climate Badges
                  </CmTypography>
                  <CmTypography style={{ textDecoration: "underline" }} variant="body">
                    SEE ALL
                  </CmTypography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  {badges.map((badgeInfo) => (
                    <div>
                      <CmBadge name={badgeInfo.name}/>
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
  imageBanner: { width: '280px', height: '265px' },
  image: { display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  HorizontalDivider: { border: '1px solid #BDFADC', width: '188px', alignSelf: 'center' },
  lowerSection: {
    background: "linear-gradient(180deg, #FFFFFF 78.34%, rgba(208, 238, 235, 0.6) 141.86%)",
    paddingBottom: "128px"
  },
  weeklyGoal: { display: 'flex', flexDirection: 'column', padding: '20px 30px', borderRadius: '20px', background: '#F5ECFE', boxShadow: '0px 4px 4px 0px #00000040}}' },
  weeklyGoalTopSection: { display: 'flex', alignItems: 'center' },
  weeklyGoalImage: { width: '105px', height: '100px' },
  textLeft: { textAlign: 'left' },
};

export default ConversationsPage;
