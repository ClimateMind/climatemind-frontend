import { useState } from 'react';
import { CardContent, Typography, Collapse, CardActions, Button, Box } from '@mui/material';

interface CMCardFoldoutProps {
  description?: string;
  shortDescription?: string;
}

const CMCardFoldout: React.FC<CMCardFoldoutProps> = ({
  description,
  shortDescription,
}: CMCardFoldoutProps) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMoreClick = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <Collapse in={showMore} timeout="auto" unmountOnExit>
        <CardContent>
          {/* Show short desciption if ther is one */}
          {shortDescription && (
            <Typography variant="body1" component="p">
              {shortDescription}
            </Typography>
          )}
          {/* Show Long desciption if ther is one */}
          {description && (
            <Typography variant="body1" component="p">
              {description}
            </Typography>
          )}
        </CardContent>
      </Collapse>

      <CardActions
        style={{
          paddingLeft: 0,
          marginLeft: 0,
        }}
      >
        <Button
          style={{
            textTransform: 'capitalize',
            marginBottom: '-0.5em',
            fontSize: '11pt',
            letterSpacing: '1pt',
          }}
          variant="text"
          onClick={handleShowMoreClick}
          data-testid="CMCardMore"
        >
          <Box px={1}>{showMore ? 'LESS' : 'MORE'}</Box>
        </Button>
      </CardActions>
    </>
  );
};

CMCardFoldout.defaultProps = {
  description:
    'Cupidatat aute Lorem aliquip fugiat reprehenderit pariatur sunt est incididunt mollit reprehenderit tempor irure excepteur. Do labore aliquip reprehenderit consectetur dolore mollit Lorem fugiat exercitation magna elit aliquip commodo commodo. Dolor adipisicing exercitation incididunt irure dolor ad aute ad commodo mollit proident. Ullamco sunt voluptate sunt quis.',
};

export default CMCardFoldout;
