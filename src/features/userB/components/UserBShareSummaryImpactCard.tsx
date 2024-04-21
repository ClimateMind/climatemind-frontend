import { useEffect, useState } from 'react';

import { CmButton, CmCard, CmTypography } from 'shared/components';
import { useApiClient } from 'shared/hooks';
import { TSharedImpactDetails } from 'types/SharedImpactDetails';
import { capitalizeFirstLetter } from 'helpers/capitalizeFirstLetter';
import UserBSharedImpactDetailsModal from './UserBSharedImpactDetailsModal';

interface Props {
  effectId: string;
}

function UserBShareSummaryImpactCard({ effectId }: Props) {
  const apiClient = useApiClient();

  const [showDetails, setShowDetails] = useState(false);
  const [effectDetails, setEffectDetails] = useState<TSharedImpactDetails | undefined>(undefined);

  useEffect(() => {
    async function getEffectDetails() {
      const effectDetails = await apiClient.getSharedImpactDetails(effectId);
      setEffectDetails(effectDetails);
    }

    getEffectDetails();
  }, [effectId]);

  if (!effectDetails) {
    return null;
  }

  return (
    <CmCard style={{ padding: 20, border: '1px solid #A347FF', marginBottom: 10 }}>
      <CmTypography variant="overline" style={{ margin: 0 }}>CLIMATE EFFECT</CmTypography>

      <CmTypography variant="h2" style={{ textAlign: 'left', margin: 0 }}>
        {capitalizeFirstLetter(effectDetails.effectTitle)}
      </CmTypography>


      <CmButton variant="text" text="Learn More" style={{ alignSelf: 'flex-start', marginTop: 20, marginLeft: -10 }} onClick={() => setShowDetails(true)} />

      {showDetails && <UserBSharedImpactDetailsModal effectId={effectId} showDetails {...effectDetails} onClose={() => setShowDetails(false)} />}
    </CmCard>
  );
}

export default UserBShareSummaryImpactCard;
