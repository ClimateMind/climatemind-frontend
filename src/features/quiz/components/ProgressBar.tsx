interface Props {
  progress: number;
}

function ProgressBar({ progress }: Props) {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ ...styles.progressBarLeft, transition: 'width 0.3s ease-in-out' , width: `${(progress) * 100}%` }}></div>
      <div style={{ ...styles.progressBarRight, transition: 'width 0.3s ease-in-out' , width: `${100 - progress * 100}%`}}></div>
    </div>
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

export default ProgressBar;
