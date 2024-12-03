import { Card } from '@mui/material';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  conversationStatus?: 'completed' | 'ongoing';
  customStyles?: React.CSSProperties
}

export default function CmRoundedCard({ children, conversationStatus, customStyles }: IProps) {

  const conversationStyle =
  conversationStatus === 'completed'
    ? styles.conversationStatusCompleted
    : conversationStatus === 'ongoing'
    ? styles.conversationStatusOngoing
    : {};

  return <Card sx={{ ...styles.card, ...conversationStyle, ...customStyles }}>{children}</Card>;
}

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    padding: '0px 16px',
    borderRadius: '20px',
  },
  conversationStatusCompleted: {
    background: 'linear-gradient(90.41deg, #FFFFFF -21.97%, rgba(255, 199, 39, 0.9) 96.54%)',
    boxShadow: "0px 4px 8px 0px #00000040",
  },
  conversationStatusOngoing: {
    boxShadow: '0px 4px 8px 0px #00000040',
    background: "#D0EEEB"
  },
};
