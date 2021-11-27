import React from 'react';
import { CardMedia } from '@material-ui/core';
import { TPersonalValueIds } from '../types/PersonalValues';
import StepTwoIcon from '../assets/achievement_icon.gif';
export interface ValueIconProps {
  valueId: TPersonalValueIds;
}

export const ValueIcon: React.FC<ValueIconProps> = ({ valueId }) => {
  return (
    <>
      <div style={{ height: '80px', width: '80px' }}>
        <img src={StepTwoIcon} />
      </div>
    </>
  );
};
