import React from 'react';
import { Box } from '@mui/material';

import { COLORS } from 'common/styles/CMTheme';
import Card from 'components/Card/Card';
import CardHeader from 'components/CardHeader';
import EffectOverlay from 'components/EffectOverlay';
import { TClimateEffect } from 'types/types';
import { CmChip, CmTypography } from 'shared/components';

type ClimateFeedCardProps = {
  index: number;
  effect: TClimateEffect;
};

export const ClimateFeedCard = ({ index, effect }: ClimateFeedCardProps) => {
  return (
    <Card
      index={index}
      imageUrl={effect.imageUrl}
      preview={
        <CardHeader
          title={effect.effectSolutions[0].solutionTitle}
          preTitle={`${effect.effectSolutions[0].solutionType} Action`}
          bgColor={COLORS.ACCENT2}
          index={index}
          cardIcon={effect.effectSolutions[0].solutionType}
        />
      }
      header={
        <CardHeader
          title={effect.effectTitle}
          preTitle={effect?.isPossiblyLocal ? 'Local impact' : ''}
          isPossiblyLocal={effect.isPossiblyLocal}
        />
      }
      footer={<EffectOverlay effect={effect} />}
    >
      <CmTypography variant="body">{effect.effectShortDescription}</CmTypography>

      <Box mt={2}>
      {effect.relatedPersonalValues?.map(
        (relPersonalVal, ind) => (
          <CmChip text={relPersonalVal} key={ind} />
        )
      )}
      </Box>
    </Card>
  );
};
