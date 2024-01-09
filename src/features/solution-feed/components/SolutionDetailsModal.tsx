import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { ActionCardHeader, CmTypography, TabbedContent } from "shared/components";
import { useRelatedMyths } from "../hooks";
import RelatedMythCard from "./RelatedMythCard";

interface Props {
  showDetails: boolean;
  solutionTitle: string;
  solutionType: string;
  imageUrl: string;
  longDescription: string;
  solutionSources: string[];
  solutionSpecificMythIRIs: string[];
  onClose: () => void;
}

function SolutionDetailsModal({ showDetails, solutionTitle, solutionType, imageUrl, longDescription, solutionSources, solutionSpecificMythIRIs, onClose }: Props) {
  const { isLoading, relatedMyths } = useRelatedMyths(solutionSpecificMythIRIs);

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
        <img src={imageUrl} alt={solutionTitle} style={styles.image} />

        <TabbedContent
          details={
            <div>
              <div style={{ paddingTop: 20 }}>
                <CmTypography variant='body' style={{ padding: 20 }}>{longDescription}</CmTypography>
              </div>

              <div style={{ marginBottom: 50 }}></div>

              {isLoading && <CmTypography variant='body' style={{ padding: 20 }}>Loading related myths...</CmTypography>}
              {!isLoading && (
                relatedMyths.map((myth) => (
                  <div style={{ marginTop: 20 }} key={myth.iri}>
                    <RelatedMythCard {...myth} />
                  </div>
                ))
              )}

              <div style={{ marginBottom: 50 }}></div>
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

export default SolutionDetailsModal;
