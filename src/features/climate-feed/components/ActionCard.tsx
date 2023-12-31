import { CmButton, CmTypography } from 'shared/components';
import ActionCardHeader from './ActionCardHeader';

interface Props {
  solutionTitle: string;
  solutionType: string;
  shortDescription: string;
  imageUrl: string;
  backgroundColor?: string;
  onLearnMore: () => void;
}

function ActionCard({ solutionTitle, solutionType, shortDescription, imageUrl, backgroundColor = '#FDED6D', onLearnMore }: Props) {
  return (
    <div style={{ ...styles.container, backgroundColor }}>
      <ActionCardHeader
        solutionTitle={solutionTitle}
        solutionType={solutionType}
        backgroundColor={backgroundColor}
      />

      {imageUrl && <img src={imageUrl} alt={solutionTitle} style={styles.image} />}

      <CmTypography variant="body" style={styles.description}>
        {shortDescription}
      </CmTypography>

      <CmButton
        variant="text"
        text="Learn more"
        style={styles.learnMore}
        onClick={onLearnMore}
      />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    maxHeight: 360,
    objectFit: 'cover',
  },
  description: {
    padding: 20,
  },
  learnMore: {
    alignSelf: 'flex-start',
    margin: 20,
    marginLeft: 20,
  },
};

export default ActionCard;
