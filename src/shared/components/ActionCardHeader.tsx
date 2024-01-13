import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import SecurityIcon from '@mui/icons-material/Security';

import { CmTypography } from 'shared/components';
import { capitalizeFirstLetter } from 'helpers/capitalizeFirstLetter';

interface Props {
  solutionTitle: string;
  solutionType: string;
  backgroundColor?: string;
}

function ActionCardHeader({ solutionTitle, solutionType, backgroundColor = '#FDED6D'}: Props) {
  return (
    <div style={{...styles.container, backgroundColor }}>
      <div style={styles.imageContainer}>
        {solutionType === 'mitigation' && <EmojiObjectsIcon sx={{ fontSize: 30 }} />}
        {solutionType === 'adaptation' && <SecurityIcon sx={{ fontSize: 30 }} />}
      </div>
      <div style={styles.titleContainer}>
        <CmTypography variant='label' style={{ fontSize: 10 }}>{solutionType.toUpperCase()} ACTION</CmTypography>
        <CmTypography variant='h3' style={styles.title}>{capitalizeFirstLetter(solutionTitle)}</CmTypography>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: '10px 0',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: 80,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '90%',
  },
  title: {
    textAlign: 'left',
    width: '90%',
    margin: 0,
  },
};

export default ActionCardHeader;
