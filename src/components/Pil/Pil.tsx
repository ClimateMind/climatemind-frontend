import React from 'react';
import { Typography } from '@material-ui/core';
import { COLORS } from '../../common/styles/CMTheme';

export interface PilProps {
  text: string;
  backgroundColor?: string;
}

export const Pil: React.FC<PilProps> = ({
  text,
  backgroundColor = COLORS.SUCCESS_LIGHT,
}) => {
  const pilStyles = {
    display: 'inline-block',
    backgroundColor,
    borderRadius: '26px',
    padding: '8px 16px 9px',
    fontSize: '12px',
    margin: '0 11px 0 0 ',
  };

  const typeStyles = {
    fontSize: '12px',
    lineHeight: '15px',
  };

  if (!text) return null;

  return (
    <div style={pilStyles}>
      <Typography style={typeStyles} variant="body1">
        {text.toLocaleLowerCase()}
      </Typography>
    </div>
  );
};
