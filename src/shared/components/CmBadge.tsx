
interface Props {
  name: string;
}


export const CmBadge = (props: Props) => {
  return (
    <div>
      <div style={styles.badge}>{/* badge content goes here */}</div>
      <span style={styles.name}>{props.name}</span>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  badge: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    opacity: '0px',
    border: '10px solid #D0EEEB',
    background: '#D9D9D9',
  },
  name: {
    textAlign: "center"
  }
};
