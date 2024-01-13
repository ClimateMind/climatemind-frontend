import { useState } from "react";
import { Collapse } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import PersonalValueIcon from "./PersonalValueIcon";
import { CmButton, CmCard, CmTypography } from "shared/components";
import { capitalizeFirstLetter } from "src/helpers/capitalizeFirstLetter";

interface Props {
  name: string;
  subTitle: string;
  shortDescription: string;
}

function PersonalValueCardSmall({ name, shortDescription, subTitle }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <CmCard>
      <div style={styles.container}>
        <PersonalValueIcon valueName={name} size='small' style={styles.image} />

        <div style={styles.textContainer}>
          <CmTypography variant="h3" style={{ margin: 0 }}>{capitalizeFirstLetter(name)}</CmTypography>
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
