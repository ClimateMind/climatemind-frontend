import { Checkbox } from '@mui/material';
import { capitalizeFirstLetter } from 'helpers/capitalizeFirstLetter';
import { CmButton, CmCard, CmTypography } from 'shared/components';

interface Props {
  solutionId: string;
  solutionTitle: string;
  solutionShortDescription: string;
  imageUrl: string;
  onLearnMore: (solutionId: string) => void;
  isSelected: boolean;
  onSelected: (effectId: string) => void;
  disabled: boolean;
  style?: React.CSSProperties;
}

function UserBSharedSolutionCard({ solutionId, solutionTitle, solutionShortDescription, imageUrl, onLearnMore, isSelected, onSelected, disabled, style }: Props) {
  return (
    <CmCard style={{ ...style, outline: isSelected ? '4px solid #A347FF' : 'none', filter: disabled ? 'grayscale(100%)' : 'none', background: disabled ? 'lightgray' : 'white' }}>
      <CmTypography variant="h3" style={styles.title}>
        {capitalizeFirstLetter(solutionTitle)}
      </CmTypography>

      {imageUrl && <img src={imageUrl} alt={solutionTitle} style={styles.image} />}

      <CmTypography variant="body" style={styles.description}>
        {solutionShortDescription}
      </CmTypography>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <CmButton variant="text" text="Learn more" style={styles.learnMore} onClick={() => onLearnMore(solutionId)} />

        <div onClick={() => onSelected(solutionId)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <CmTypography variant="label">SELECT TOPIC</CmTypography>
          <Checkbox disabled={disabled} checked={isSelected} style={{ marginRight: 15, color: isSelected ? '#39F5AD' : '#07373B' }} />
        </div>
      </div>
    </CmCard>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  preTitle: {
    marginTop: 20,
    marginBottom: -20,
    paddingLeft: 20,
    fontSize: 10,
  },
  title: {
    textAlign: 'left',
    paddingLeft: 20,
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

export default UserBSharedSolutionCard;
