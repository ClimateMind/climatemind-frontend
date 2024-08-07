import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { capitalizeFirstLetter } from "helpers/capitalizeFirstLetter";
import { CmTypography, TabbedContent } from "shared/components";
import { useApiClient } from "shared/hooks";

interface Props {
  showDetails: boolean;
  effectId: string;
  effectTitle: string;
  imageUrl: string;
  onClose: () => void;
}

function UserBSharedImpactDetailsModal({ showDetails, effectId, effectTitle, imageUrl, onClose }: Props) {
  const apiClient = useApiClient();

  const [longDescription, setLongDescription] = useState('');
  const [sources, setSources] = useState<string[]>([]);

  useEffect(() => {
    async function fetchDetails() {
      const data = await apiClient.getSharedImpactDetails(effectId);
      setLongDescription(data.longDescription);
      setSources(data.effectSources);
    }

    if (effectId) {
      fetchDetails();
    }
  }, [effectId]);

  return ReactDOM.createPortal(
    <Dialog open={showDetails} onClose={onClose} fullWidth maxWidth='sm' PaperProps={{ style: { height: '100vh' }}}>
      <div onClick={onClose}>
        <DialogTitle style={styles.closeCardContainer}>
          <CmTypography variant='label'>Close</CmTypography>
          <ExpandMoreIcon fontSize='large' style={styles.closeIcon}/>
        </DialogTitle>
      </div>

      <DialogContent sx={{ padding: 0 }}>
        <CmTypography variant="h3" style={styles.title}>{capitalizeFirstLetter(effectTitle)}</CmTypography>

        {imageUrl && <img src={imageUrl} alt={effectTitle} style={styles.image} />}

        <TabbedContent
          details={
            <div style={{ paddingTop: 20, marginBottom: 50 }}>
              {longDescription.split('\n\n').map((paragraph, index) => (
                <CmTypography key={index} variant='body' style={{ padding: 20 }}>{paragraph}</CmTypography>
              ))}
            </div>
          }
          sources={
            <div style={{ padding: 20, marginBottom: 50 }}>
              {sources.map((source, index) => (
                <CmTypography key={index} variant='body' style={styles.source}>{source}</CmTypography>
              ))}
            </div>
          }
        />
      </DialogContent>
    </Dialog>
    , document.getElementsByTagName('body')[0]
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
  source: {
    cursor: 'pointer',
    fontWeight: 600,
    paddingTop: 20,
    textDecoration: 'underline',
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
  }
};

export default UserBSharedImpactDetailsModal;
