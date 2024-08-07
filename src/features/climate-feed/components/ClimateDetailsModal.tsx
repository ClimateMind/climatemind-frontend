import { useState } from "react";
import ReactDOM from "react-dom";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { capitalizeFirstLetter } from "helpers/capitalizeFirstLetter";
import { CmTypography, TabbedContent } from "shared/components";
import { TSolution } from "types/Solutions";
import ActionCard from "./ActionCard";
import { CardOpenEvent, analyticsService } from "services";
import SolutionDetailsModal from "features/solution-feed/components/SolutionDetailsModal";
import { useApiClient } from "shared/hooks";

interface Props {
  showDetails: boolean;
  effectTitle: string;
  effectDescription: string;
  effectSolutions: TSolution[];
  effectSources: string[];
  imageUrl: string;
  onClose: () => void;
}

function ClimateDetailsModal({ showDetails, effectTitle, effectDescription, effectSolutions, effectSources, imageUrl, onClose }: Props) {
  const apiClient = useApiClient();

  const [solutionDetails, setSolutionDetails] = useState<TSolution | null>(null);

  const paragraphs = effectDescription.split('\n\n');

  async function learnMoreHandler(solutionId: string) {
    analyticsService.postEvent(CardOpenEvent, solutionId);

    try {
      const allSolutions = await apiClient.getSolutionsFeed();
      setSolutionDetails(allSolutions.find((solution) => solution.iri === solutionId)!);
    } catch (error) {
      console.error(error);
    }
  }

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
            <>
              <div style={{ paddingTop: 20 }}>
                {paragraphs.map((paragraph, index) => (
                  <CmTypography key={index} variant='body' style={{ padding: 20 }}>{paragraph}</CmTypography>
                ))}
              </div>

              {effectSolutions.map((solution) => (
                <div style={{ marginTop: 20 }} key={solution.solutionTitle}>
                  <ActionCard {...solution} onLearnMore={learnMoreHandler} />
                </div>
              ))}

              <div style={{ marginBottom: 50 }}></div>
            </>
          }
          sources={
            <div style={{ padding: 20, marginBottom: 50 }}>
              {effectSources.map((source, index) => (
                <CmTypography key={index} variant='body' style={styles.source}>{source}</CmTypography>
              ))}
            </div>
          }
        />

        {solutionDetails && <SolutionDetailsModal showDetails={solutionDetails !== null} {...solutionDetails} onClose={() => setSolutionDetails(null)} />}
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

export default ClimateDetailsModal;
