import { useState } from "react";
import { useMediaQuery } from "@mui/material";

import { CmBackButton, CmTypography } from "shared/components";
import ProgressBar from "./ProgressBar";
import Answer from "./Answer";
import FeedbackForm from "./FeedbackForm";

interface Props {
  currentQuestionIndex: number;
  maxQuestionIndex: number;
  question: string;
  onSelect: (index: number) => void;
  onBack: () => void;
  onSubmitFeedback: (feedback: string) => void;
}

function SingleQuestion({ currentQuestionIndex, maxQuestionIndex, question, onSelect, onBack, onSubmitFeedback }: Props) {
  const isSmall = useMediaQuery('(max-width: 960px)');

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);

  function selectAnswerHandler(index: number) {
    setSelectedAnswerIndex(index);

    setTimeout(() => {
      setSelectedAnswerIndex(null);
      onSelect(index);
    }, 300);
  }

  // When questions have a line break, the second line starts with a space.
  // This is a workaround to remove that space.
  const questionText = question.split('\n').map(item => item.trim()).join('\n');

  const showBackButtonTop = isSmall && (maxQuestionIndex - currentQuestionIndex) !== 9;
  const showBackButtonBottom = !isSmall && (maxQuestionIndex - currentQuestionIndex) !== 9;

  let progress = currentQuestionIndex / 10 - 0.1;
  if (maxQuestionIndex === 20) {
    progress = (currentQuestionIndex - 10) / 10 - 0.1;
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <CmBackButton text='Previous' onClick={onBack} style={{ visibility: showBackButtonTop ? 'visible' : 'hidden' }} />
          {currentQuestionIndex > maxQuestionIndex && <CmTypography variant="h3" style={{ fontSize: 14, margin: 0, marginLeft: 'auto', color: '#77AAAF' }}>BONUS</CmTypography>}
          {currentQuestionIndex <= maxQuestionIndex && <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginLeft: 'auto' }}>
            <CmTypography variant="h3" style={{ fontSize: 24, margin: 0, color: '#77AAAF' }}>Q{currentQuestionIndex.toString()}</CmTypography>
            <CmTypography variant="h4" style={{ margin: 0, color: '#77AAAF' }}>/{maxQuestionIndex.toString()}</CmTypography>
          </div>}
      </div>

      <ProgressBar progress={progress} />

      {currentQuestionIndex === 11 && maxQuestionIndex === 10 ? <FeedbackForm onSubmit={onSubmitFeedback} /> :  <>
        <CmTypography variant="label" style={{ ...styles.question, minHeight: isSmall ? 120 : 80 }}>{questionText}</CmTypography>

        <Answer disabled={selectedAnswerIndex !== null} selected={selectedAnswerIndex === 1} onSelect={selectAnswerHandler} index={1} text="Not Like Me At All" />
        <Answer disabled={selectedAnswerIndex !== null} selected={selectedAnswerIndex === 2} onSelect={selectAnswerHandler} index={2} text="Not Like me" />
        <Answer disabled={selectedAnswerIndex !== null} selected={selectedAnswerIndex === 3} onSelect={selectAnswerHandler} index={3} text="Little Like Me" />
        <Answer disabled={selectedAnswerIndex !== null} selected={selectedAnswerIndex === 4} onSelect={selectAnswerHandler} index={4} text="Somewhat Like Me" />
        <Answer disabled={selectedAnswerIndex !== null} selected={selectedAnswerIndex === 5} onSelect={selectAnswerHandler} index={5} text="Like Me" />
        <Answer disabled={selectedAnswerIndex !== null} selected={selectedAnswerIndex === 6} onSelect={selectAnswerHandler} index={6} text="Very Much Like Me" />
      </>}

      <CmBackButton text='Previous' onClick={onBack} style={{ visibility: showBackButtonBottom ? 'visible' : 'hidden', alignSelf: 'flex-start', marginTop: 40 }} />
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  question: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
};

export default SingleQuestion;
