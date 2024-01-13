import { useEffect, useState } from "react";

import { CmButton, CmCard, CmTypography } from "shared/components";
import { TSharedSolutionDetails } from "types/SharedSolutionDetails";
import UserBSharedSolutionDetailsModal from "./UserBSharedSolutionDetailsModal";
import { capitalizeFirstLetter } from "helpers/capitalizeFirstLetter";
import { useApiClient } from "shared/hooks";

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
    <CmCard style={{ padding: 20, border: '1px solid #A347FF' }}>
      <CmTypography variant='overline' style={{ margin: 0 }}>CLIMATE EFFECT</CmTypography>
      <CmTypography variant='h2' style={{ textAlign: 'left', margin: 0 }}>{capitalizeFirstLetter(solutionDetails.solutionTitle)}</CmTypography>

      <CmButton variant='text' text="Learn More" style={{ alignSelf: 'flex-start', marginTop: 20 }} onClick={() => setShowDetails(true)} />

      {showDetails && (
        <UserBSharedSolutionDetailsModal
          showDetails
          solutionId={solutionId}
          {...solutionDetails}
          onClose={() => setShowDetails(false)}
        />
      )}
    </CmCard>
  );
}

export default UserBShareSummarySolutionCard;
