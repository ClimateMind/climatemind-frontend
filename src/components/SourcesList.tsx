import React from 'react';
import { Typography, makeStyles, Box } from '@material-ui/core';

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
        <Typography variant="body1" className={classes.emptyMessage}>
          No sources to display
        </Typography>
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
