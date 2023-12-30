import React from 'react';
import { Box } from '@mui/material';
import { CmTypography } from 'shared/components';

export interface SourcesListProps {
  sources: string[] | undefined;
}

const SourcesList: React.FC<SourcesListProps> = ({ sources }) => {
  return (
    <Box p={0} mx={1} my={2}>
      {sources?.length === 0 && (
        <CmTypography variant="body" style={{ padding: '1.3em 1em' }}>
          No sources to display
        </CmTypography>
      )}
      <ul style={{
    listStyleType: 'none',
    padding: '0.2em 1em',
    margin: 0,
  }}>
        {sources?.map((source, i) => (
          <li style={{
            padding: 0,
            margin: 0,
            paddingBottom: '1em',
            wordWrap: 'break-word',
          }} key={i}>
            <a href={source} target="_blank" rel="noopener noreferrer">
              <CmTypography variant="body">{source}</CmTypography>
            </a>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default SourcesList;
