import PageSection from "./PageSection";

interface Props {
    sections: [React.ReactNode];
    style?: React.CSSProperties;
  }
  
  function PageContent({ sections, style }: Props) {
    return (
      <div style={{ ...styles.root, ...style }}>
        {sections.map(section => <PageSection>{section}</PageSection>)}
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
  