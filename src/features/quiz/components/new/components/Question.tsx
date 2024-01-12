import { useMediaQuery } from '@mui/material';
import { CmTypography } from 'shared/components';

interface Props {
  question: string;
}

function Question({ question }: Props) {
  const isSmall = useMediaQuery('(max-width: 960px)');

  return (
    // We set the minHeight so that the answers beneath the
    // question don't jump around when the question changes.
    <CmTypography
      variant="label"
      style={{ ...styles.question, minHeight: isSmall ? 120 : 80 }}
    >
      {question}
    </CmTypography>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  question: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
};

export default Question;
