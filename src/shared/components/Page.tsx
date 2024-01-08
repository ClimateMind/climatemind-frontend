interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

function Page({ children, style }: Props) {
  return (
    <div style={{ ...styles.root, ...style }}>
      {children}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    backgroundColor: '#D0EEEB',
    width: '100%',
  }
};

export default Page;
