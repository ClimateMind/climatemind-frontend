import { useEffect, useState } from 'react';

import { CmButton, CmCard, CmTypography } from 'shared/components';
import { useApiClient } from 'shared/hooks';
import { TSharedSolutionDetails } from 'types/SharedSolutionDetails';
import { capitalizeFirstLetter } from 'helpers/capitalizeFirstLetter';
import UserBSharedSolutionDetailsModal from './UserBSharedSolutionDetailsModal';

interface Props {
  solutionId: string;
}

function UserBShareSummarySolutionCard({ solutionId }: Props) {
  const apiClient = useApiClient();

  const [showDetails, setShowDetails] = useState(false);
  const [solutionDetails, setSolutionDetails] = useState<TSharedSolutionDetails | undefined>(undefined);

  useEffect(() => {
    async function getEffectDetails() {
      const solutionDetails = await apiClient.getSharedSolutionDetails(solutionId);
      setSolutionDetails(solutionDetails);
    }

    getEffectDetails();
  }, [solutionId]);

  if (!solutionDetails) {
    return null;
  }

  return (
    <CmCard style={{ padding: 20, border: '1px solid #A347FF', marginBottom: 10 }}>
      <CmTypography variant="overline" style={{ margin: 0 }}>{solutionDetails.solutionType} Solution</CmTypography>

      <CmTypography variant="h2" style={{ textAlign: 'left', margin: 0 }}>
        {capitalizeFirstLetter(solutionDetails.solutionTitle)}
      </CmTypography>

      <CmButton variant="text" text="Learn More" style={{ alignSelf: 'flex-start', marginTop: 20, marginLeft: -10 }} onClick={() => setShowDetails(true)} />

      {showDetails && <UserBSharedSolutionDetailsModal showDetails solutionId={solutionId} {...solutionDetails} onClose={() => setShowDetails(false)} />}
    </CmCard>
  );
}

export default UserBShareSummarySolutionCard;
