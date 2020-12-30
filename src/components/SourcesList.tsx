import React from 'react';
import { Typography, makeStyles, Box } from '@material-ui/core';

export interface SourcesListProps {
  sources: string[];
}

const useStyles = makeStyles({
  sourcesList: {
    listStyleType: 'none',
  },
  sourcesItem: {
    paddingBottom: '1em',
  },
});

const SourcesList: React.FC<SourcesListProps> = ({ sources }) => {
  const classes = useStyles();

  return (
    <Box p={3}>
      {sources?.length === 0 && (
        <Typography variant="body1">No sources to display</Typography>
      )}
      <ul className={classes.sourcesList}>
        {sources?.map((source, i) => (
          <li className={classes.sourcesItem} key={i}>
            <a href={source} target="_blank" rel="noopener noreferrer">
              <Typography variant="body1">{source}</Typography>
            </a>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default SourcesList;
