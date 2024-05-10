import { useState } from 'react';
import { Collapse, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { CmButton, CmCard, CmTypography } from 'shared/components';
import NotifyIcon from './NotifyIcon';
import HowYouAlignButton from './HowYouAlignButton';
import ViewSelectedTopics from './ViewSelectedTopics';
import { capitalizeFirstLetter } from 'helpers/capitalizeFirstLetter';
import YesWeTalkedButton from './YesWeTalkedButton';
import ConversationRating from './ConversationRating';
import { useToastMessage } from 'shared/hooks';

interface Props {
  conversationId: string;
  userBName: string;
  conversationState: number;
  onDeleteConversation: (conversationId: string) => void;
  scrollPosition: any;
}

function ConversationCard({ conversationId, userBName, conversationState, onDeleteConversation, scrollPosition }: Props) {
  const { showSuccessToast } = useToastMessage();

  const USER_B_NAME = capitalizeFirstLetter(userBName);
  const [expanded, setExpanded] = useState(false);

  function handleCopyLink() {
    const currentUrl = new URL(window.location.href);
    const url = `${currentUrl.protocol}//${currentUrl.host}/`;

    const link = url + 'landing/' + conversationId;

    navigator.clipboard.writeText(link);
    showSuccessToast('Link copied!');
  }

  const headerText = [
    `Invited ${USER_B_NAME} to talk`,
    `Prepare to talk with ${USER_B_NAME}`,
    `Prepare to talk with ${USER_B_NAME}`,
    `Ready to talk with ${USER_B_NAME}`,
    `Talked with ${USER_B_NAME}`,
    `Talked with ${USER_B_NAME}`,
    `Invited ${USER_B_NAME} to talk`,
  ];

  return (
    <CmCard style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <CmTypography variant="caption" style={{ flexShrink: 1, fontSize: 14 }}>
          {headerText[conversationState]}
        </CmTypography>
        <CmButton variant="text" text="Copy Link" style={{ visibility: expanded ? 'visible' : 'hidden' }} onClick={handleCopyLink} />
        {!expanded && conversationState > 0 && conversationState < 5 && <NotifyIcon state={conversationState} />}
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CmTypography variant="h2" style={{ textAlign: 'left', margin: 0, marginRight: 10 }}>
          {USER_B_NAME}
        </CmTypography>
        {expanded && (
          <IconButton style={{ color: 'black', padding: 0, top: -2 }}>
            <EditIcon />
          </IconButton>
        )}
      </div>

      {/* For state 0, display a text that the userB has to take the quiz */}
      <Collapse in={expanded && conversationState === 0}>
        <CmTypography variant="body" style={{ marginTop: 20 }}>
          When {USER_B_NAME} is finished, we will send you an email and their results will appear here. Then you can start preparing for your chat!
        </CmTypography>
        <CmTypography variant="body">If you need to resend test their link, you can access it by clicking “COPY LINK”.</CmTypography>
      </Collapse>

      {/* For every other state, show the text and buttons the userA needs */}
      <Collapse in={expanded && conversationState > 0}>
        <CmTypography variant="h4" style={styles.subTitles}>
          1. {USER_B_NAME} took the values quiz
        </CmTypography>
        <HowYouAlignButton conversationState={conversationState} conversationId={conversationId} scrollPosition={scrollPosition} />

        <CmTypography variant="h4" style={styles.subTitles}>
          2. See what you can discuss with {USER_B_NAME}
        </CmTypography>
        <ViewSelectedTopics conversationState={conversationState} conversationId={conversationId} />

        <CmTypography variant="h4" style={styles.subTitles}>
          3. Have you had your conversation with {USER_B_NAME}?
        </CmTypography>
        {conversationState <= 3 && <YesWeTalkedButton conversationState={conversationState} />}
        {conversationState > 3 && <ConversationRating />}
      </Collapse>

      {/* Button to delete a conversation and expand / collapse the card */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: expanded ? 30 : 0 }}>
        {expanded && (
          <IconButton onClick={() => onDeleteConversation(conversationId)}>
            <DeleteIcon style={{ color: '#77AAAF' }} />
          </IconButton>
        )}
        {!expanded && <div></div>}
        <CmButton variant="text" text={expanded ? 'Less' : 'More'} onClick={() => setExpanded(!expanded)} />
      </div>
    </CmCard>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  subTitles: {
    textAlign: 'left',
    marginTop: 15,
    marginBottom: 10,
  },
};

export default ConversationCard;
