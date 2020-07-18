import React from 'react';
import '../global.scss';

type ButtonProps = {
  displayText: string,
  onClick: () => void,
}

const Button = ({displayText, onClick}: ButtonProps) => {
  return (
    <div>
      <button className="button-primary" type="button" onClick={onClick}>{<span className='button-font'>{displayText}</span>}</button>
    </div>
  )
}

export default Button