import React from 'react';
import { Box } from '@mui/material';
import { COLORS } from '../common/styles/CMTheme';
import { capitalize } from '../helpers/capitalize';
import { capitalizeFirstLetter } from '../helpers/capitalizeFirstLetter';
import { CmTypography } from 'shared/components';

export interface MythHeaderProps {
  mythTitle: string;
  mythRebuttal: string;
}

const MythHeader: React.FC<MythHeaderProps> = ({
  mythTitle,
  mythRebuttal,
}: MythHeaderProps) => {
  return (
    <>
      <Box mb={4}>
        <CmTypography
          variant="label"
          style={{
            textTransform: 'uppercase',
            letterSpacing: '1pt',
            fontSize: '10px',
            marginBottom: '-0.1em',
            color: COLORS.ERROR,
            textAlign: 'left',
          }}
        >
          Myth
        </CmTypography>

        <CmTypography
          variant="h3"
          style={{
            margin: 0,
            padding: '5px 0',
            fontSize: 'clamp(16px, 2vw, 1.2rem)' || 16,
            color: COLORS.ERROR,
            textAlign: 'left',
          }}
        >
          <em>{capitalize(mythTitle)}</em>
        </CmTypography>
      </Box>

      <Box>
        <CmTypography
          variant="label"
          style={{
            textTransform: 'uppercase',
            letterSpacing: '1pt',
            fontSize: '10px',
            marginBottom: '-0.1em',
            color: COLORS.SUCCESS,
            textAlign: 'left',
          }}
        >
          Truth
        </CmTypography>

        <CmTypography
          variant="h3"
          style={{
            margin: 0,
            padding: '5px 0',
            fontSize: 'clamp(16px, 2vw, 1.2rem)' || 16,
            letterSpacing: '1px',
            color: COLORS.SUCCESS,
            textAlign: 'left',
          }}
        >
          {capitalizeFirstLetter(mythRebuttal)}
        </CmTypography>
      </Box>
    </>
  );
};

export default MythHeader;
