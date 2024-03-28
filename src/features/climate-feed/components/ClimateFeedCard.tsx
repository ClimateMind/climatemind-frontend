import { CmButton, CmCard, CmChip, CmClimateHeader, CmTypography } from "shared/components";
import { PersonalValueTooltip } from "features/quiz";

interface Props {
  effectId: string;
  preTitle?: string;
  effectTitle: string;
  effectShortDescription: string;
  imageUrl: string;
  effectSolutions: { solutionTitle: string, solutionType: string }[];
  relatedPersonalValues?: string[];
  onLearnMore: (effectId: string) => void;
}

function ClimateFeedCard({ effectId, preTitle, effectTitle, effectShortDescription, imageUrl, effectSolutions, relatedPersonalValues, onLearnMore }: Props) {
  return (
    <CmCard>
      <CmClimateHeader preHeader={preTitle} header={effectTitle} style={{ padding: 20 }} />

      {imageUrl && <img src={imageUrl} alt={effectTitle} style={styles.image} />}

      <CmTypography variant='body' style={styles.description}>{effectShortDescription}</CmTypography>

      <div style={{ paddingLeft: 20 }}>
        {relatedPersonalValues?.map((value: string) => (
          <PersonalValueTooltip value={value} key={value}>
            <CmChip text={value} key={value} style={{ marginRight: 5, marginTop: 10 }} />
          </PersonalValueTooltip>
        ))}
      </div>

      <CmButton variant='text' text='Learn more' style={styles.learnMore} onClick={() => onLearnMore(effectId)} />

      {effectSolutions.length > 0 && (
        <CmClimateHeader
          preHeader={effectSolutions[0].solutionType.toUpperCase() + ' ACTION'}
          header={effectSolutions[0].solutionTitle}
          headerIcon={effectSolutions[0].solutionType}
          style={{ backgroundColor: '#FDED6D' }}
        />
      )}
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
    paddingRight: 20,
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

export default ClimateFeedCard;
