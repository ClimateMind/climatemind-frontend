import { useState } from 'react';
import QuestionAnswer from './QuestionAnswer';

interface Props {
  onSelect: (index: number) => void;
}

function QuestionAnswers({ onSelect }: Props) {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);

  function selectAnswerHandler(index: number) {
    setSelectedAnswerIndex(index);
    
    // We wait a moment for the radio button animation to finish before calling onSelect.
    setTimeout(() => {
      setSelectedAnswerIndex(null);
      onSelect(index);
    }, 300);
  }

  return (
    <>
      <QuestionAnswer disabled={selectedAnswerIndex !== null} selected={selectedAnswerIndex === 1} onSelect={selectAnswerHandler} index={1} text="Not Like Me At All" />
      <QuestionAnswer disabled={selectedAnswerIndex !== null} selected={selectedAnswerIndex === 2} onSelect={selectAnswerHandler} index={2} text="Not Like me" />
      <QuestionAnswer disabled={selectedAnswerIndex !== null} selected={selectedAnswerIndex === 3} onSelect={selectAnswerHandler} index={3} text="Little Like Me" />
      <QuestionAnswer disabled={selectedAnswerIndex !== null} selected={selectedAnswerIndex === 4} onSelect={selectAnswerHandler} index={4} text="Somewhat Like Me" />
      <QuestionAnswer disabled={selectedAnswerIndex !== null} selected={selectedAnswerIndex === 5} onSelect={selectAnswerHandler} index={5} text="Like Me" />
      <QuestionAnswer disabled={selectedAnswerIndex !== null} selected={selectedAnswerIndex === 6} onSelect={selectAnswerHandler} index={6} text="Very Much Like Me" />
    </>
  );
}

export default QuestionAnswers;
