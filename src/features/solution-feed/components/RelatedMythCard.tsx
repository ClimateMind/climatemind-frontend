import FeedbackIcon from '@mui/icons-material/Feedback';
import { CmCard, CmTypography } from "shared/components";

interface Props {
  mythTitle: string;
  mythRebuttal: string;
}

function RelatedMythCard({ mythTitle, mythRebuttal }: Props) {
  return (
    <CmCard style={{ width: 'calc(100% - 40px)', padding: 20 }}>
      <FeedbackIcon style={{ alignSelf: 'flex-end' }} />

      <CmTypography variant='label' style={{ ...styles.preTitles, color: '#B00620' }}>MYTH</CmTypography>
      <CmTypography variant='h4' style={{ ...styles.titles, color: '#B00620' }}>{mythTitle}</CmTypography>

      <CmTypography variant='label' style={{ ...styles.preTitles, color: '#00A85F' }}>TRUTH</CmTypography>
      <CmTypography variant='h4' style={{ ...styles.titles, color: '#00A85F' }}>{mythRebuttal}</CmTypography>
    </CmCard>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
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
};


export default RelatedMythCard;
