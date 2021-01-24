import React from 'react';
import { Typography } from '@material-ui/core';

interface Props {
  text: string;
}

// Component to take a text string and split it in \n and render as paragrapghs
const Paragraphs: React.FC<Props> = ({ text }) => {
  const paras = text.split('\n\n');
  return (
    <div>
      {paras.map((p, i) => (
        <Typography
          variant="body1"
          component="p"
          key={i}
          style={{ margin: '0.5em 0' }}
          data-testid="paragraphs-p"
        >
          {p}
        </Typography>
      ))}
    </div>
  );
};

export default Paragraphs;
