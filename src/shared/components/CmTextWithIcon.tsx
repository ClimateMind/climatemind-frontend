import CmTypography from './CmTypography';

interface ICmTextWithIconProps {
  text: string;
  icon?: any;
  variant?: 'h4' | 'h1' | 'h2' | 'h3' | 'body' | 'body-italics' | 'button' | 'onboarding-button' | 'caption' | 'label' | 'overline';
}
export default function CmTextWithIcon({ text, icon, variant = 'h4' }: ICmTextWithIconProps) {
  return (
    <CmTypography style={styles.text} variant={variant}>{text} <span style={{ marginLeft: '8px' }}>{icon}</span></CmTypography>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  text: {
    paddingRight: "8px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
};
