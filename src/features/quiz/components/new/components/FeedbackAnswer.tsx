import { useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { CmBackButton, CmButton, CmTextInput } from 'shared/components';

interface Props {
  onSubmit: (feedback: string) => void;
  onGoBack: () => void;
}

function FeedbackAnswer({ onSubmit, onGoBack }: Props) {
  const isSmall = useMediaQuery('(max-width: 960px)');

  const [feedback, setFeedback] = useState('');

  function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    setFeedback('');
    onSubmit(feedback);
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <CmTextInput
        id='feedback'
        type='text'
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />

      <div style={styles.buttonContainer}>
        {!isSmall && <CmBackButton text='Previous' onClick={onGoBack} />}
        <CmButton text='Finish Quiz' style={{ alignSelf: 'flex-end' }} onClick={handleSubmit} />
      </div>
    </form>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
};

export default FeedbackAnswer;
