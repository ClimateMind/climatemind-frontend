import { useEffect, useState } from "react";

import { ClimateApi } from "api/ClimateApi";
import { useAuth } from "hooks/auth/useAuth";
import { useSession } from "hooks/useSession";
import { CmButton, CmCard, CmTypography } from "shared/components";
import { TSharedImpactDetails } from "types/SharedImpactDetails";
import UserBSharedImpactDetailsModal from "./UserBSharedImpactDetailsModal";
import { capitalizeFirstLetter } from "helpers/capitalizeFirstLetter";

interface Props {
  effectId: string;
}

function UserBShareSummaryImpactCard({ effectId }: Props) {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();

  const [showDetails, setShowDetails] = useState(false);
  const [effectDetails, setEffectDetails] = useState<TSharedImpactDetails | undefined>(undefined);

  useEffect(() => {
    async function getEffectDetails() {
      const effectDetails = await new ClimateApi(sessionId, accessToken).getImpactDetails(effectId);
      setEffectDetails(effectDetails);
    }

    getEffectDetails();
  }, [effectId, sessionId, accessToken]);

  if (!effectDetails) {
    return null;
  }

  return (
    <CmCard style={{ padding: 20, border: '1px solid #A347FF' }}>
      <CmTypography variant='overline' style={{ margin: 0 }}>CLIMATE EFFECT</CmTypography>
      <CmTypography variant='h2' style={{ textAlign: 'left', margin: 0 }}>{capitalizeFirstLetter(effectDetails.effectTitle)}</CmTypography>

      <CmButton variant='text' text="Learn More" style={{ alignSelf: 'flex-start', marginTop: 20 }} onClick={() => setShowDetails(true)} />

      {showDetails && (
        <UserBSharedImpactDetailsModal
          effectId={effectId}
          showDetails
          {...effectDetails}
          onClose={() => setShowDetails(false)}
        />
      )}
    </CmCard>
  );
}

export default UserBShareSummaryImpactCard;
