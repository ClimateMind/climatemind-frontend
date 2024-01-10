import { useState } from "react";
import { CmButton, CmTextInput, CmTypography } from "shared/components";

interface Props {
  onSubmit: (feedback: string) => void;
}

function FeedbackForm({ onSubmit }: Props) {
  const [feedback, setFeedback] = useState('');

  function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    onSubmit(feedback);
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <CmTypography variant='h3' style={styles.question}>What's stopping you from having climate conversations?</CmTypography>

      <CmTextInput
        id='feedback'
        type='text'
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />

      <CmButton text='Finish Quiz' style={styles.button} onClick={handleSubmit} />
    </form>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  question: {
    marginTop: 60,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  button: {
    margin: '20px auto',
  }
};

export default FeedbackForm;
