import { useState } from 'react';
import { CmButton, CmTextInput } from 'shared/components';

interface Props {
  onSubmit: (feedback: string) => void;
}

function FeedbackAnswer({ onSubmit }: Props) {
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

      <CmButton text='Finish Quiz' style={{ margin: '20px auto' }} onClick={handleSubmit} />
    </form>
  );
}

export default FeedbackAnswer;
