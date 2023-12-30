import React from 'react';
import { Card, CardMedia, Grid, CardContent, Box, Backdrop } from '@mui/material';
import { COLORS } from '../../common/styles/CMTheme';

export interface CardProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  preview?: React.ReactNode;
  children?: React.ReactNode;
  index?: number;
  imageUrl?: string;
  actionHeadline?: string;
  cardIcon?: 'prevention' | 'protection' | false;
  bgColor?: string;
  preTitle?: string;
  border?: boolean;
  disabled?: boolean;
}

const CMCard: React.FC<CardProps> = ({
  header,
  imageUrl,
  preview,
  footer,
  bgColor,
  children,
  border = false,
  disabled = false,
}: CardProps) => {
  return (
    <Grid item sm={12} lg={12} style={styles.root} data-testid="CMCard">
      <Card style={{...styles.card, backgroundColor: bgColor, border: border ? `4px solid ${COLORS.CARD_BORDER}` : 'none' }}>
        <div style={{ position: 'relative' }}>
          <Backdrop
            style={{
              position: 'absolute',
              zIndex: 1,
              opacity: '0.5',
            }}
            open={disabled}
            data-testid="CMCard-disabled-backdrop-id"
          ></Backdrop>
          {header}
          {imageUrl && (
            <CardMedia
              style={styles.media}
              image={imageUrl}
              data-testid="CMCard-Image"
            />
          )}

          <CardContent>{children}</CardContent>
          <Box px={0} pb={2} mx={0}>
            {footer}
          </Box>
          {preview}
        </div>
      </Card>
    </Grid>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    margin: '0 0 2em',
    width: '100%',
  },
  card: {
    height: '100%',
    width: '100%',
  },
  media: {
    margin: 0,
    paddingTop: '56.25%',
  },
};

export default CMCard;
