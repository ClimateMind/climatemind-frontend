interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

function PageContent({ children, style }: Props) {
  return (
    <div style={{ ...styles.root, ...style }}>
      {children}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    maxWidth: 640,
    margin: '0 auto',
    padding: '60px 20px',
  },
};

export default PageContent;
