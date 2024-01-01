interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

function CmCard({ children, style }: Props) {
  return (
    <div style={{ ...styles.card, ...style }}>
      {children}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
};

export default CmCard;
