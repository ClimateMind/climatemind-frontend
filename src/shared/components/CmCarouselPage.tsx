interface Props {
  children: React.ReactNode;
}

function CmCarouselPage({ children }: Props) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      {children}
    </div>
  );
}

export default CmCarouselPage;
