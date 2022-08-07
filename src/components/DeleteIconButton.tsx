import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

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
  const useStyles = makeStyles(() =>
    createStyles({
      deleteIcon: {
        color: color,
      },
    })
  );
  const classes = useStyles();
  return (
    <IconButton onClick={onClick} size={size} aria-label="delete">
      <DeleteIcon className={classes.deleteIcon} fontSize="inherit" />
    </IconButton>
  );
};

export default DeleteIconButton;
