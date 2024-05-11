import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

import { CmButton, CmTextInput, CmTypography, Page, PageContent } from 'shared/components';
import { ConversationsDrawer, CopyLinkModal, useConversationInvite } from 'features/conversations';

function ConversationsPage() {
  const location = useLocation();
  const isSmall = useMediaQuery('(max-width: 960px)');

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
    if (location.state?.id) {
      setConversationDrawerOpen(true);
    }
  }, []);

  return (
    <Page style={{ backgroundColor: 'white' }}>
      <PageContent style={{ maxWidth: 400, paddingBottom: 0, height: '100%' }}>
        <CmTypography variant="h1">Start a conversation</CmTypography>

        <CmTypography variant="body" style={{ textAlign: 'center', marginBottom: 20 }}>
          Create a personalized link for each person you want to talk to. Then share it, so they can take the quiz, discover your shared values, and pick topics to talk about.
        </CmTypography>

        <CmTypography variant="body" style={{ textAlign: 'center', fontSize: '0.8em', fontWeight: 'bold' }}>
          We will send you an email when they agree to share their results with you!
        </CmTypography>

        <form onSubmit={handleSubmit} style={styles.form}>
          <CmTextInput
            id="friend"
            label="Name of recipient"
            placeholder='Try "Peter Smith" or "Mom"'
            value={friendsName}
            onChange={(e) => setFriendsName(e.target.value)}
            helperText={friendsName.length > 20 && 'Name must be less than 20 characters'}
            fullWidth={false}
            style={{ marginTop: 30, marginBottom: 30 }}
          />

          <CmButton text="Create Link" onClick={handleSubmit} disabled={friendsName === '' || friendsName.length > 20} />
        </form>

        <button onClick={() => setConversationDrawerOpen(true)} style={{ ...styles.openDrawerButton, bottom: isSmall ? 56 : 0 }}>
          <img src="/arrows/arrow-up-white.svg" alt="arrow-up" />
          <CmTypography variant="h4" style={{ marginTop: 0, marginBottom: 10 }}>
            Ongoing Conversations
          </CmTypography>
        </button>

        <ConversationsDrawer open={conversationDrawerOpen} onClose={() => setConversationDrawerOpen(false)} />

        <CopyLinkModal isOpen={showCopyLinkModal} onClose={() => setShowCopyLinkModal(false)} userBName={friendsName} link={link} />
      </PageContent>
    </Page>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
};

export default ConversationsPage;
