import { useState } from 'react';
import { Collapse } from '@mui/material';

import PersonalValueIcon from 'features/quiz/components/PersonalValueIcon';
import { capitalizeFirstLetter } from 'src/helpers/capitalizeFirstLetter';
import { CmButton, CmCard, CmTypography } from 'shared/components';

interface Props {
  nr: number;
  name: string;
  shortDescription: string;
  description: string;
}

function PersonalValueCard({ nr, name, shortDescription, description }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <CmCard>
      <div style={styles.titleContainer}>
        <CmTypography variant='label' style={styles.preTitle}>NO.{nr.toString()}</CmTypography>
        <CmTypography variant='h3' style={styles.title}>{capitalizeFirstLetter(name)}</CmTypography>
      </div>

      <PersonalValueIcon valueName={name} size='large' style={styles.image} />

      <CmTypography variant='body' style={styles.description}>
        {shortDescription}
      </CmTypography>

      <Collapse in={expanded}>
        <CmTypography variant='body' style={styles.description}>
          {description}
        </CmTypography>
      </Collapse>

      <CmButton variant='text' text={expanded ? 'LESS' : 'MORE'} onClick={() => setExpanded(!expanded)} style={styles.moreButton} />
    </CmCard>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  titleContainer: {
    padding: 20,
  },
  preTitle: {
    fontSize: 10,
    marginBottom: -2,
  },
  title: {
    textAlign: 'left',
    margin: 0,
  },
  image: {
    maxHeight: 360,
  },
  description: {
    padding: 20,
  },
  moreButton: {
    padding: 20,
    alignSelf: 'flex-start',
  },
};

export default PersonalValueCard;
