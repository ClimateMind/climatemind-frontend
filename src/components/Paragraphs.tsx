import React from 'react';
import { CmTypography } from 'shared/components';

interface Props {
  text: string | undefined;
  fontSize?: string;
  bold?: boolean;
}

// Component to take a text string and split it in \n and render as paragrapghs
const Paragraphs: React.FC<Props> = ({
  text = '',
  bold = false,
  fontSize = '16px',
}) => {
  const paras = text.split('\n\n');

  return (
    <div>
      {paras.map((p, i) => (
        <CmTypography
          variant="body"
          key={i}
          style={{
            margin: '0.5em 0',
            fontWeight: bold ? 900 : 'inherit',
            fontSize: fontSize,
          }}
        >
          {p}
        </CmTypography>
      ))}
    </div>
  );
};

export default Paragraphs;
