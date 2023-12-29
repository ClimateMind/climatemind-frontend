import React from 'react';
import { makeStyles, Box } from '@material-ui/core';
import CmTypography from 'shared/components/CmTypography';

export interface SourcesListProps {
  sources: string[] | undefined;
}

const useStyles = makeStyles({
  sourcesList: {
    listStyleType: 'none',
    padding: '0.2em 1em',
    margin: 0,
  },
  sourcesItem: {
    padding: 0,
    margin: 0,
    paddingBottom: '1em',
    wordWrap: 'break-word',
  },
  emptyMessage: {
    padding: '1.3em 1em',
  },
});

const SourcesList: React.FC<SourcesListProps> = ({ sources }) => {
  const classes = useStyles();

  return (
    <Box p={0} mx={1} my={2}>
      {sources?.length === 0 && (
        <CmTypography variant="body" className={classes.emptyMessage}>
          No sources to display
        </CmTypography>
      )}
      <ul className={classes.sourcesList}>
        {sources?.map((source, i) => (
          <li className={classes.sourcesItem} key={i}>
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
