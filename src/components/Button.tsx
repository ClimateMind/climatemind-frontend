import React from 'react';
import MaterialUIButton from '@material-ui/core/Button';
import '../common/styles/global.scss';

type ButtonProps = {
  displayText: string;
  onClick: () => void;
};

const Button = ({ displayText, onClick }: ButtonProps) => {
  return (
    <div>
      <MaterialUIButton variant="contained" size="large" onClick={onClick}>
        {displayText}
      </MaterialUIButton>
    </div>
  );
};

export default Button;
