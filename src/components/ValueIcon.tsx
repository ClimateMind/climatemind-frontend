import React from 'react';
import { CardMedia } from '@material-ui/core';

export type PersonalValuesNames =
  | 'hedonism'
  | 'stimulation'
  | 'security'
  | 'conformity'
  | 'benevolence'
  | 'tradition'
  | 'universalism'
  | 'self_direction'
  | 'achievement'
  | 'power';

export interface ValueIconProps {
  // TODO: FIX TYPE LATER
  valueName: string;
}

export const ValueIcon: React.FC<ValueIconProps> = ({ valueName }) => {
  return (
    <>
      <CardMedia
        image={
          process.env.PUBLIC_URL +
          `personality/small_icons/${valueName}_icon.gif`
        }
        style={{ height: '80px', width: '80px' }}
      />
    </>
  );
};
