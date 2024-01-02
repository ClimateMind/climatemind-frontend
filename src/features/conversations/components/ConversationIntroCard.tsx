import { Collapse } from "@mui/material";
import { useState } from "react";
import { CmButton, CmCard, CmTypography } from "shared/components";

function ConversationIntroCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <CmCard style={{ padding: 20 }}>
      <CmTypography variant='h2' style={{ margin: 0, maxWidth: 400, alignSelf: 'center' }}>How to talk about Climate Change</CmTypography>

      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CmTypography variant='h3'>Step 1: Bond</CmTypography>
        <CmTypography variant='body' style={{ textAlign: 'center' }}>Start your conversation by bonding over similar personal values and interests.</CmTypography>
        <CmTypography variant='body' style={{ textAlign: 'center' }}>Climate Mind helps with this by giving you a special link to the values questionnaire to share with others before you chat.</CmTypography>

        <CmTypography variant='h3'>Step 2: Relate</CmTypography>
        <CmTypography variant='body' style={{ textAlign: 'center' }}>Connect the dots for others on how your shared values relate to climate change.</CmTypography>

        <CmTypography variant='h3'>Step 3: Inspire</CmTypography>
        <CmTypography variant='body' style={{ textAlign: 'center' }}>Motivate the other person with solutions they find attractive.</CmTypography>
      </Collapse>

      <CmButton variant='text' text={expanded ? 'Less' : 'More'} onClick={() => setExpanded(!expanded)} style={{ alignSelf: 'flex-end', marginTop: 20 }} />
    </CmCard>
  );
}

export default ConversationIntroCard;
