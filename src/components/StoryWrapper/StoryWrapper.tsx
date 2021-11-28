import React from 'react';

// This component was create to give a consistent wrapper to storybook stories

export interface StoryWrapperProps {
  backgroundColor?: string;
}

export const StoryWrapper: React.FC<StoryWrapperProps> = ({
  children,
  backgroundColor = 'lightgrey',
}) => {
  return (
    <div
      style={{
        backgroundColor,
        height: 'calc(100vh - 16px)',
        width: '100%',
        padding: '8px',
      }}
    >
      {children}
    </div>
  );
};
