import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { CmButton, CmCard, CmTypography } from "shared/components";
import { capitalizeFirstLetter } from "helpers/capitalizeFirstLetter";
import { Collapse } from "@mui/material";

interface Props {
  valueName: string;
  subTitle: string;
  shortDescription: string;
}

function PersonalValueCardSmall({ valueName, shortDescription, subTitle }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <CmCard>
      <div style={styles.container}>
        <img src={`/personal_values/small/${valueName.split(' ').join('_')}.gif`} alt={`${valueName} icon`} style={styles.image} />

        <div style={styles.textContainer}>
          <CmTypography variant="h3" style={{ margin: 0 }}>{capitalizeFirstLetter(valueName)}</CmTypography>
          <CmTypography variant="h2" style={{ margin: 0 }}>{subTitle}</CmTypography>
        </div>

        <div onClick={() => setExpanded(!expanded)} style={{ cursor: 'pointer', marginRight: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CmButton variant="text" text={expanded ? 'LESS' : 'MORE'} />
          <ExpandMoreIcon fontSize='large' style={{...styles.expandIcon, transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}/>
        </div>
      </div>

      <Collapse in={expanded}>
        <CmTypography variant="body" style={styles.description}>
          {shortDescription}
        </CmTypography>
      </Collapse>
    </CmCard>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 80,
    height: 80,
    margin: 20,
  },
  textContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '90%',
  },
  expandIcon: {
    top: -10,
    color: '#39F5AD',
    position: 'relative',
    transition: 'transform 0.3s ease',
    marginTop: 10,
  },
  description: {
    textAlign: 'left',
    margin: 20,
  }
};

export default PersonalValueCardSmall;
