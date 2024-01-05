interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

function PageSection({ children, style }: Props) {
  return (
    <section style={{ ...styles.root, ...style }}>
      {children}
    </section>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    backgroundColor: '#D0EEEB',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
};

export default PageSection;
