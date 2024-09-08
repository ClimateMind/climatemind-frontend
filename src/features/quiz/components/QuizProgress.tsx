import { CmBackButton, CmTypography } from 'shared/components';

interface Props {
  onBack: () => void;
  currentQuestionIndex: number;
  maxQuestionIndex: number;
  alternativeText?: string;
}

function QuizProgress({ onBack, currentQuestionIndex, maxQuestionIndex, alternativeText }: Props) {
  // We only show the back button on the top for small screens. For larger screens it is beneath the question.
  // And of course we don't show it on the first question, because there's no question to go back to.
  const showBackButtonTop = (maxQuestionIndex - currentQuestionIndex) !== 9;

  // Calculate the current value of the progress bar.
  let progress = currentQuestionIndex / 10 - 0.1;
  if (maxQuestionIndex === 20) {
    progress = (currentQuestionIndex - 10) / 10 - 0.1;
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <CmBackButton text='Previous' onClick={onBack} style={{ visibility: showBackButtonTop ? 'visible' : 'hidden' }} />
          {/* Either show the alternative text or the progress (eg. Q2/11) */}
          {alternativeText && <CmTypography variant="h3" style={{ fontSize: 14, margin: 0, marginLeft: 'auto', color: '#77AAAF' }}>BONUS</CmTypography>}
          {!alternativeText && <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginLeft: 'auto' }}>
            <CmTypography variant="h3" style={{ fontSize: 24, margin: 0, color: '#77AAAF' }}>{'Q' + currentQuestionIndex.toString()}</CmTypography>
            <CmTypography variant="h4" style={{ margin: 0, color: '#77AAAF' }}>/{maxQuestionIndex.toString()}</CmTypography>
          </div>}
      </div>

    {/* Progress Bar */}
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ ...styles.progressBarLeft, transition: 'width 0.3s ease-in-out' , width: `${(progress) * 100}%` }}></div>
      <div style={{ ...styles.progressBarRight, transition: 'width 0.3s ease-in-out' , width: `${100 - progress * 100}%`}}></div>
    </div>
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  progressBarLeft: {
    backgroundColor: 'black',
    height: 4,
  },
  progressBarRight: {
    backgroundColor: '#a347ff',
    height: 4,
  },
};

export default QuizProgress;
