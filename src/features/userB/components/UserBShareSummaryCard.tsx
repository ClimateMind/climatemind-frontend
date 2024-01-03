import { Collapse } from "@mui/material";
import { useState } from "react";
import { CmButton, CmCard, CmTypography } from "shared/components";

interface Props {
  topMatchValue: string;
  topMatchPercent: string;
  userAName: string;
  description: string;
}

function UserBShareSummaryCard({ topMatchValue, topMatchPercent, userAName, description }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <CmCard style={{ padding: 20, border: '1px solid #A347FF' }}>
      <CmTypography variant='h3' style={{ textAlign: 'left', margin: 0 }}>{topMatchValue}</CmTypography>

      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <CmTypography variant='h1' style={{ textAlign: 'left', margin: 0, padding: 0 }}>{topMatchPercent}%</CmTypography>
        <CmTypography variant='h4' style={{ textAlign: 'left', margin: 0, paddingLeft: 10 }}>match with {userAName}</CmTypography>
      </div>

      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CmTypography variant='body' style={{ marginTop: 20 }}>{description}</CmTypography>
      </Collapse>

      <CmButton variant='text' text={expanded ? 'Less' : 'More'} onClick={() => setExpanded(!expanded)} style={{ alignSelf: 'flex-start', marginTop: 20 }} />
    </CmCard>
  );
}

export default UserBShareSummaryCard;
