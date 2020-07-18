import React, { FC } from 'react';

type TextProps = {
  size: number;
  color: string;
  fontFamily: string;
  fontStyle?: string;
  fontWeight?: number;
  textAlign: 'center';
};

const Text: FC<TextProps> = ({
  size,
  color,
  fontFamily,
  fontStyle,
  fontWeight,
  children,
  textAlign,
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
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Text;
