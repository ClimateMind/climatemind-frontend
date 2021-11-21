import React from 'react';

export interface ValueIconProps {
  valueName:
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
}

export const ValueIcon: React.FC<ValueIconProps> = ({
  valueName = 'confomity',
}) => {
  return (
    <div
      style={{ backgroundColor: 'red', height: '80px', width: '80px' }}
    ></div>
  );
};
