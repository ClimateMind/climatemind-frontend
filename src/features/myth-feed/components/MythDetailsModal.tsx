import ReactDOM from "react-dom";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { CmTypography } from "shared/components";
import TabbedContent from "components/TabbedContent";

interface Props {
  showDetails: boolean;
  mythTitle: string;
  mythRebuttal: string;
  faultyLogicDescription: string;
  mythSources: string[];
  onClose: () => void;
}

function MythDetailsModal({ showDetails, mythTitle, mythRebuttal, faultyLogicDescription, mythSources, onClose }: Props) {
  return ReactDOM.createPortal(
    <Dialog open={showDetails} onClose={onClose} fullWidth maxWidth='sm' PaperProps={{ style: { height: '100vh' }}}>
      <div onClick={onClose}>
        <DialogTitle style={styles.closeCardContainer}>
          <CmTypography variant='label'>Close</CmTypography>
          <ExpandMoreIcon fontSize='large' style={styles.closeIcon}/>
        </DialogTitle>
      </div>

      <DialogContent style={{ marginTop: 30 }}>
        <CmTypography variant='label' style={{ ...styles.preTitles, color: '#B00620' }}>MYTH</CmTypography>
        <CmTypography variant='h4' style={{ ...styles.titles, color: '#B00620' }}>{mythTitle}</CmTypography>

        <CmTypography variant='label' style={{ ...styles.preTitles, color: '#00A85F' }}>TRUTH</CmTypography>
        <CmTypography variant='h4' style={{ ...styles.titles, color: '#00A85F' }}>{mythRebuttal}</CmTypography>

        <TabbedContent
          details={<CmTypography style={{ marginTop: 20, marginBottom: 50 }} variant='body'>{faultyLogicDescription}</CmTypography>}
          sources={
            <div style={{ marginTop: 20, marginBottom: 50 }}>
              {mythSources.map((source, index) => (
                <CmTypography key={index} variant='body' style={{ ...styles.link, paddingBottom: 20 }}>{source}</CmTypography>
              ))}
            </div>
          }
        />
      </DialogContent>
    </Dialog>,
    document.getElementsByTagName('body')[0],
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
  preTitles: {
    fontSize: 10,
  },
  titles: {
    fontSize: 15,
    textAlign: 'left',
    marginTop: 0,
    letterSpacing: 1.2,
    lineHeight: 1.5,
  },
  link: {
    fontWeight: 600,
    textDecoration: 'underline',
    cursor: 'pointer',
  }
};

export default MythDetailsModal;
