import React from 'react';
import { ReactComponent as ArrowBack } from '../assets/icon-arrow-back.svg';

export interface PrevButtonProps {
  text?: string;
  clickPrevHandler: () => void;
}

const PrevButton: React.FC<PrevButtonProps> = ({
  text,
  clickPrevHandler,
}: PrevButtonProps) => {
  return (
    <div data-testid="PrevButton">
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          padding: 0,
          textTransform: 'uppercase',
          letterSpacing: '1pt',
          fontFamily: 'Bilo',
          fontSize: '14px',
          cursor: 'pointer',
          paddingTop: '6px',
        }}
        onClick={() => clickPrevHandler()}
      >
        <div>
          <ArrowBack />
        </div>
        <div>{text}</div>
      </div>
    </div>
  );
};

PrevButton.defaultProps = {
  text: 'Back',
};

export default PrevButton;
