import React, { FC } from 'react';

type TextProps = {
  size: number;
  color: string;
  fontFamily: string;
  fontStyle?: string;
  fontWeight?: number;
  textAlign: 'center';
  padding?: string;
};

const Text: FC<TextProps> = ({
  size,
  color,
  fontFamily,
  fontStyle,
  fontWeight,
  children,
  textAlign,
  padding,
}) => {
  return (
    <>
      <div
        style={{
          fontSize: size,
          fontStyle: fontStyle,
          fontWeight: fontWeight,
          fontFamily: fontFamily,
          color: color,
          textAlign: textAlign,
          padding: padding,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Text;
