import React from 'react';
import {
  Card,
  CardMedia,
  Grid,
  CardContent,
  Box,
  Backdrop,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
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
  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        margin: '0 0 2em',
        width: '100%',
      },
      card: {
        backgroundColor: bgColor,
        height: '100%',
        width: '100%',
        border: border ? `4px solid ${COLORS.CARD_BORDER}` : 'none',
      },
      media: {
        margin: 0,
        paddingTop: '56.25%',
      },
      mediaDisable: {},
      more: {
        textTransform: 'capitalize',
        marginBottom: '-0.5em',
        fontSize: '11pt',
        letterSpacing: '1pt',
      },
    })
  );

  const classes = useStyles();

  return (
    <Grid item sm={12} lg={12} className={classes.root} data-testid="CMCard">
      <Card className={classes.card}>
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
              className={classes.media}
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

export default CMCard;
