import { capitalizeFirstLetter } from "helpers/capitalizeFirstLetter";
import { CmButton, CmCard, CmTypography } from "shared/components";

interface Props {
  iri: string;
  solutionTitle: string;
  solutionType: string;
  shortDescription: string;
  imageUrl: string;
  onLearnMore: (solutionId: string) => void;
}

function SolutionFeedCard({ iri, solutionTitle, solutionType, shortDescription, imageUrl, onLearnMore }: Props) {
  return (
    <CmCard>
      <CmTypography variant='label' style={styles.preTitle}>{solutionType.toUpperCase()} ACTION</CmTypography>
      <CmTypography variant='h3' style={styles.title}>{capitalizeFirstLetter(solutionTitle)}</CmTypography>

      {imageUrl && <img src={imageUrl} alt={solutionTitle} style={styles.image} />}

      <CmTypography variant='body' style={styles.description}>{shortDescription}</CmTypography>

      <CmButton variant='text' text='Learn more' style={styles.learnMore} onClick={() => onLearnMore(iri)} />
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

export default SolutionFeedCard;
