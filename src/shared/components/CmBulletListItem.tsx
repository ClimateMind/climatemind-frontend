
import CmTypography from "./CmTypography";

interface Props {
  text: string;
  style?: React.CSSProperties;
}

function CmBulletListItem({ text, style }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', alignSelf: 'flex-start', ...style }}>
      <div style={{ width: 5, height: 5, borderRadius: 5, backgroundColor: 'black', marginRight: 10 }} />
      <div style={{ flex: 1 }}>
        <CmTypography variant='body'>{text}</CmTypography>
      </div>
    </div>
  );
}

export default CmBulletListItem;
