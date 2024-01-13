import { Checkbox } from "@mui/material";
import { capitalizeFirstLetter } from "src/helpers/capitalizeFirstLetter";
import { CmButton, CmCard, CmChip, CmTypography } from "shared/components";

interface Props {
  effectId: string;
  effectTitle: string;
  effectShortDescription: string;
  imageUrl: string;
  relatedPersonalValues: string[];
  onLearnMore: (effectId: string) => void;
  isSelected: boolean;
  onSelected: (effectId: string) => void;
  disabled: boolean;
  style?: React.CSSProperties;
}

function UserBSharedImpactCard({ effectId, effectTitle, effectShortDescription, imageUrl, relatedPersonalValues, onLearnMore, isSelected, onSelected, disabled, style }: Props) {
  return (
    <CmCard style={{...style, outline: isSelected ? '4px solid #A347FF' : 'none', filter: disabled ? 'grayscale(100%)' : 'none', background: disabled ? 'lightgray' : 'white' }}>
      <CmTypography variant='h3' style={styles.title}>{capitalizeFirstLetter(effectTitle)}</CmTypography>

      {imageUrl && <img src={imageUrl} alt={effectTitle} style={styles.image} />}

      <CmTypography variant='body' style={styles.description}>{effectShortDescription}</CmTypography>

      <div style={{ paddingLeft: 20 }}>
        {relatedPersonalValues.map((value: string) => (
          <CmChip text={value} key={value} style={{ marginRight: 5 }} />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <CmButton variant='text' text='Learn more' style={styles.learnMore} onClick={() => onLearnMore(effectId)} />

        <div onClick={() => onSelected(effectId)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <CmTypography variant='label'>SELECT TOPIC</CmTypography>
          <Checkbox disabled={disabled} checked={isSelected} style={{ marginRight: 15, color: isSelected ? '#39F5AD' : '#07373B' }} />
        </div>
      </div>
    </CmCard>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
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

export default UserBSharedImpactCard;
