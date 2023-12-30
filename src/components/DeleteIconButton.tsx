import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type ButtonProps = {
  size?: 'small' | 'medium' | undefined;
  color?: string;
  onClick?: (x?: any) => void;
};

const DeleteIconButton: React.FC<ButtonProps> = ({
  size = 'medium',
  color = 'primary',
  onClick,
}: ButtonProps) => {
  return (
    <IconButton onClick={onClick} size={size} aria-label="delete">
      <DeleteIcon style={{ color }} fontSize="inherit" />
    </IconButton>
  );
};

export default DeleteIconButton;
