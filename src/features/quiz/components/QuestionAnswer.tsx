import { useMediaQuery } from "@mui/material";

import { CmRadio, CmTypography } from "shared/components";

interface Props {
  index: number;
  text: string;
  selected: boolean;
  onSelect: (index: number) => void;
  disabled: boolean;
}

function Answer({ index, text, selected, onSelect, disabled }: Props) {
  const isSmall = useMediaQuery('(max-width: 960px)');

  function handleSelect() {
    if (disabled) return;

    onSelect(index);
  }

  return (
    <div style={{ ...styles.answerContainer, flexDirection: isSmall ? 'row-reverse' : 'row' }} onClick={handleSelect}>
      <CmRadio checked={selected} style={{ marginRight: isSmall ? 0 : 40 }} />
      <CmTypography variant='label' style={styles.answerText}>{text}</CmTypography>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  answerContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
    cursor: 'pointer',
    width: '100%',
  },
  answerText: {
    fontWeight: 'bold',
    fontSize: 14,
    width: '100%',
  },
};

export default Answer;
