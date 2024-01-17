import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import SecurityIcon from '@mui/icons-material/Security';

import CmTypography from './CmTypography';
import { capitalizeFirstLetter } from 'helpers/capitalizeFirstLetter';

interface Props {
  preHeader?: string;
  header: string;
  headerIcon?: string;
  style?: React.CSSProperties;
}

function CmClimateHeader({ preHeader, header, headerIcon, style }: Props) {
  return (
    <div style={{...styles.container, ...style }}>
      {headerIcon && <div style={styles.imageContainer}>
        {headerIcon === 'mitigation' && <EmojiObjectsIcon sx={{ fontSize: 30 }} />}
        {headerIcon === 'adaptation' && <SecurityIcon sx={{ fontSize: 30 }} />}
      </div>}
      <div style={styles.titleContainer}>
        <CmTypography variant='label' style={{ fontSize: 10 }}>{preHeader}</CmTypography>
        <CmTypography variant='h3' style={styles.title}>{capitalizeFirstLetter(header)}</CmTypography>
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

export default CmClimateHeader;
