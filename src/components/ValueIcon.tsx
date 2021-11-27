import React from 'react';
import { CardMedia } from '@material-ui/core';
import { TPersonalValueIds } from '../types/PersonalValues';
export interface ValueIconProps {
  // TODO: FIX TYPE LATER
  valueId: TPersonalValueIds;
}

export const ValueIcon: React.FC<ValueIconProps> = ({ valueId }) => {
  return (
    <>
      <CardMedia
        image={
          process.env.PUBLIC_URL + `personality/small_icons/${valueId}_icon.gif`
        }
        style={{ height: '80px', width: '80px' }}
      />
    </>
  );
};
