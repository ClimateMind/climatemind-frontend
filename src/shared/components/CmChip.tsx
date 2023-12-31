import CmTypography from "./CmTypography";

interface Props {
  text: string;
  style?: React.CSSProperties;
}

function CmChip({ text, style }: Props) {
  return (
    <CmTypography variant="body" style={{ ...styles.chip, ...style }}>
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
  },
};

export default CmChip;
