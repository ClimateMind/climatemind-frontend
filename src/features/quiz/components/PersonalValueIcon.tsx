interface Props {
  valueName: string;
  size: 'small' | 'large';
  style?: React.CSSProperties;
}

function PersonalValueIcon({ valueName, size, style }: Props) {
  return (
    <>
      { size=== 'small' && valueName === 'achievement' && <img src="/personal_values/small/achievement.gif" alt="achievement icon" style={style} /> }
      { size=== 'small' && valueName === 'benevolence' && <img src="/personal_values/small/benevolence.gif" alt="benevolence icon" style={style} /> }
      { size=== 'small' && valueName === 'conformity' && <img src="/personal_values/small/conformity.gif" alt="conformity icon" style={style} /> }
      { size=== 'small' && valueName === 'hedonism' && <img src="/personal_values/small/hedonism.gif" alt="hedonism icon" style={style} /> }
      { size=== 'small' && valueName === 'power' && <img src="/personal_values/small/power.gif" alt="power icon" style={style} /> }
      { size=== 'small' && valueName === 'security' && <img src="/personal_values/small/security.gif" alt="security icon" style={style} /> }
      { size=== 'small' && valueName === 'self direction' && <img src="/personal_values/small/self_direction.gif" alt="self_direction icon" style={style} /> }
      { size=== 'small' && valueName === 'stimulation' && <img src="/personal_values/small/stimulation.gif" alt="stimulation icon" style={style} /> }
      { size=== 'small' && valueName === 'tradition' && <img src="/personal_values/small/tradition.gif" alt="tradition icon" style={style} /> }
      { size=== 'small' && valueName === 'universalism' && <img src="/personal_values/small/universalism.gif" alt="universalism icon" style={style} /> }

      { size=== 'large' && valueName === 'achievement' && <img src="/personal_values/large/achievement.gif" alt="achievement icon" style={style} /> }
      { size=== 'large' && valueName === 'benevolence' && <img src="/personal_values/large/benevolence.gif" alt="benevolence icon" style={style} /> }
      { size=== 'large' && valueName === 'conformity' && <img src="/personal_values/large/conformity.gif" alt="conformity icon" style={style} /> }
      { size=== 'large' && valueName === 'hedonism' && <img src="/personal_values/large/hedonism.gif" alt="hedonism icon" style={style} /> }
      { size=== 'large' && valueName === 'power' && <img src="/personal_values/large/power.gif" alt="power icon" style={style} /> }
      { size=== 'large' && valueName === 'security' && <img src="/personal_values/large/security.gif" alt="security icon" style={style} /> }
      { size=== 'large' && valueName === 'self direction' && <img src="/personal_values/large/self_direction.gif" alt="self_direction icon" style={style} /> }
      { size=== 'large' && valueName === 'stimulation' && <img src="/personal_values/large/stimulation.gif" alt="stimulation icon" style={style} /> }
      { size=== 'large' && valueName === 'tradition' && <img src="/personal_values/large/tradition.gif" alt="tradition icon" style={style} /> }
      { size=== 'large' && valueName === 'universalism' && <img src="/personal_values/large/universalism.gif" alt="universalism icon" style={style} /> }
    </>
  );
}

export default PersonalValueIcon;
