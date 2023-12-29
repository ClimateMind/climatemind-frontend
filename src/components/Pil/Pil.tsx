import React from 'react';
import { COLORS } from '../../common/styles/CMTheme';
import CmTypography from 'shared/components/CmTypography';

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
      <CmTypography style={typeStyles} variant="label">
        {text.toLocaleLowerCase()}
      </CmTypography>
    </div>
  );
};
