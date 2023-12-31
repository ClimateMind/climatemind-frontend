import React from "react";
import CmTypography from "./CmTypography";

interface Props {
  text: string;
}

function CmChip({ text }: Props) {
  return (
    <CmTypography variant="body" style={styles.chip}>
      {text}
    </CmTypography>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  chip: {
    display: 'inline-block',
    backgroundColor: '#E4FEF1',
    borderRadius: 50,
    padding: '5px 10px',
    margin: 5,
  },
};

export default CmChip;
