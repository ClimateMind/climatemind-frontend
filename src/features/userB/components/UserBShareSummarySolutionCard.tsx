import { useEffect, useState } from "react";

import { ClimateApi } from "api/ClimateApi";
import { useAuth } from "hooks/auth/useAuth";
import { useSession } from "hooks/useSession";
import { CmButton, CmCard, CmTypography } from "shared/components";
import { TSharedSolutionDetails } from "types/SharedSolutionDetails";
import UserBSharedSolutionDetailsModal from "./UserBSharedSolutionDetailsModal";
import { capitalizeFirstLetter } from "helpers/capitalizeFirstLetter";

interface Props {
  solutionId: string;
}

function UserBShareSummarySolutionCard({ solutionId }: Props) {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();

  const [showDetails, setShowDetails] = useState(false);
  const [solutionDetails, setSolutionDetails] = useState<TSharedSolutionDetails | undefined>(undefined);

  useEffect(() => {
    async function getEffectDetails() {
      const solutionDetails = await new ClimateApi(sessionId, accessToken).getSolutionDetails(solutionId);
      setSolutionDetails(solutionDetails);
    }

    getEffectDetails();
  }, [solutionId, sessionId, accessToken]);

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
