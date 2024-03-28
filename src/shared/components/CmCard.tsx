import React from 'react';

interface Props {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const CmCard = React.forwardRef<HTMLDivElement, Props>(({ children, style }, ref) => {
  return (
    <div ref={ref} style={{ ...styles.card, ...style }}>
      {children}
    </div>
  );
});

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    boxSizing: 'border-box',
    backgroundColor: 'white',
    borderRadius: 5,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
};

export default CmCard;
