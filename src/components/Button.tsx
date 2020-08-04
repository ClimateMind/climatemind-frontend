import React from 'react';
import Button from '@material-ui/core/Button';
import '../global.scss';

type ButtonProps = {
  displayText: string;
  onClick: () => void;
};

const PrimaryButton = ({ displayText, onClick }: ButtonProps) => {
  return (
    <div>
      <Button variant="contained" onClick={onClick}>
        {displayText}
      </Button>
    </div>
  );
};

export default PrimaryButton;
