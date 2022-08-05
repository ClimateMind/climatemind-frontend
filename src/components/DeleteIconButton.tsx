import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

type ButtonProps = {
  size?: string;
  color?: string;
  onClick?: () => void;
};

const DeleteIconButton: React.FC<ButtonProps> = ({
  size = "large",
  color = "primary",
  onClick
}: ButtonProps) => {
  return (
    <IconButton onClick={onClick} size={size} aria-label="delete">
      <DeleteIcon sx={{ color: { color } }} fontSize="inherit" />
    </IconButton>
  );
};

export default DeleteIconButton;