import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { ActionCardHeader, CmTypography, TabbedContent } from "shared/components";
import { useSession } from "hooks/useSession";
import { ClimateApi } from "api/ClimateApi";
import { useAppSelector } from "store/hooks";

interface Props {
  showDetails: boolean;
  solutionId: string;
  solutionTitle: string;
  imageUrl: string;
  onClose: () => void;
}

function UserBSharedSolutionDetailsModal({ showDetails, solutionId, solutionTitle, imageUrl, onClose }: Props) {
  const { sessionId } = useSession();
  const { accessToken } = useAppSelector(state => state.auth.user);

  const [solutionType, setSolutionType] = useState<string>('');
  const [longDescription, setLongDescription] = useState('');
  const [solutionSources, setSolutionSources] = useState<string[]>([]);

  useEffect(() => {
    async function fetchDetails() {
      const data = await new ClimateApi(sessionId, accessToken).getSolutionDetails(solutionId);
      setSolutionType(data.solutionType[0]);
      setLongDescription(data.longDescription);
      setSolutionSources(data.solutionSources);
    }

    if (solutionId) {
      fetchDetails();
    }
  }, [solutionId, sessionId, accessToken]);

  return (
    <Dialog open={showDetails} onClose={onClose} fullWidth maxWidth='sm' PaperProps={{ style: { height: '100vh' }}}>
      <div onClick={onClose}>
        <DialogTitle style={styles.closeCardContainer}>
          <CmTypography variant='label'>Close</CmTypography>
          <ExpandMoreIcon fontSize='large' style={styles.closeIcon}/>
        </DialogTitle>
      </div>

      <DialogContent sx={{ padding: 0 }}>
        <ActionCardHeader solutionTitle={solutionTitle} solutionType={solutionType} backgroundColor='white' />
        {imageUrl && <img src={imageUrl} alt={solutionTitle} style={styles.image} />}

        <TabbedContent
          details={
            <div style={{ paddingTop: 20, marginBottom: 50 }}>
              <CmTypography variant='body' style={{ padding: 20 }}>{longDescription}</CmTypography>
            </div>
          }
          sources={
            <div style={{ padding: 20 }}>
              {solutionSources.map((source, index) => (
                <CmTypography key={index} variant='body' style={{ ...styles.link, paddingTop: 20 }}>{source}</CmTypography>
              ))}
            </div>
          }
        />
      </DialogContent>
    </Dialog>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  closeCardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    cursor: 'pointer',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    height: 30,
  },
  closeIcon: {
    color: '#39F5AD',
    position: 'relative',
    top: -10,
  },
  title: {
    textAlign: 'left',
    padding: 20,
    marginBottom: 0,
  },
  image: {
    width: '100%',
    maxHeight: 360,
    objectFit: 'cover',
  },
  link: {
    fontWeight: 600,
    textDecoration: 'underline',
    cursor: 'pointer',
  }
};

export default UserBSharedSolutionDetailsModal;
