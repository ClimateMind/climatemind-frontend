import React from 'react';
import { makeStyles } from '@material-ui/core';
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
  const useStyles = makeStyles({
    text: {
      margin: '0.5em 0',
      fontWeight: bold ? 900 : 'inherit',
      fontSize: fontSize,
    },
  });
  const paras = text.split('\n\n');
  const classes = useStyles();

  return (
    <div>
      {paras.map((p, i) => (
        <CmTypography
          variant="body"
          key={i}
          className={classes.text}
        >
          {p}
        </CmTypography>
      ))}
    </div>
  );
};

export default Paragraphs;
