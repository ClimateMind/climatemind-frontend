interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

function Page({ children, style }: Props) {
  return (
    <main style={{ ...styles.root, ...style }}>
      {children}
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    backgroundColor: '#D0EEEB',
    width: '100%',
    flex: 1,
  }
};

export default Page;
