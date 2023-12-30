import { Grid, Box } from '@mui/material';
import CardIcon from './CardIcon';
import { COLORS } from '../common/styles/CMTheme';
import RoomIcon from '@mui/icons-material/Room';

import React, { CSSProperties } from 'react';
import { CmTypography } from 'shared/components';

export interface CardHeaderProps {
  title: string | undefined;
  index?: number;
  cardIcon?: 'adaptation' | 'mitigation' | 'idea' | false;
  bgColor?: string;
  preTitle?: string | undefined;
  preTitleStyle?: 'positive' | 'warning';
  isPossiblyLocal?: 0 | 1;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  cardIcon = false,
  bgColor,
  preTitle,
  preTitleStyle,
  isPossiblyLocal,
}: CardHeaderProps) => {
  const preTitleColor = () => {
    switch (preTitleStyle) {
      case 'positive':
        return COLORS.SUCCESS;
      case 'warning':
        return COLORS.WARNING;
      default:
        return 'inherit';
    }
  };
  const preIconStyles = { fontSize: 12, margin: 0, padding: 0 };

  return (
    <div style={{...styles.root, backgroundColor: bgColor ? bgColor : 'inherit' }} data-testid="CardHeader">
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        style={styles.cardHeader}
      >
        <Box display="flex" flexDirection="row" alignItems="center">
          {cardIcon && (
            <Grid item data-testid="CardIcon">
              <CardIcon actionType={cardIcon} />
            </Grid>
          )}
          <Box p={1}>
            <Grid item xs={12} container>
              {preTitle && (
                <Grid item xs={10} container alignItems="center">
                  {isPossiblyLocal === 1 && (
                    <Grid
                      item
                      xs={1}
                      style={styles.preTitleIcon}
                      data-testid="LocalIcon"
                    >
                      <RoomIcon style={preIconStyles} />
                    </Grid>
                  )}
                  <Grid item xs={9} data-testid="PreTitle">
                    <CmTypography
                      variant="label"
                      style={{...styles.preTitle, color: preTitleColor(), fontSize: 10 }}
                    >
                      {preTitle}
                    </CmTypography>
                  </Grid>
                </Grid>
              )}
              <CmTypography
                variant="h3"
                style={styles.title}
              >
                {title}
              </CmTypography>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  root: {
    padding: '1em 0',
    width: '100%',
  },
  cardHeader: {
    paddingTop: '8px',
    paddingBottom: '0',
    width: '100%',
  },
  preTitle: {
    textTransform: 'uppercase',
    letterSpacing: '1pt',
    fontSize: '10px',
    marginBottom: '-0.4em',
  },
  preTitleIcon: {
    marginTop: '-5px',
    marginBottom: '-10px',
  },
  title: {
    margin: 0,
  },
};

export default CardHeader;
