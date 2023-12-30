import React from "react";

interface Props {
  progress: number;
}

function ProgressBar({ progress }: Props) {
  console.log(progress)
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ ...styles.progressBarLeft, width: `${(progress) * 10}%` }}></div>
      <div style={{ ...styles.progressBarRight, width: `${100 - progress * 10}%`}}></div>
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
