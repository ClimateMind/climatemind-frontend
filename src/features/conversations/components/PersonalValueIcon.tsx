interface Props {
  valueName: string;
  style?: React.CSSProperties;
}

function PersonalValueIcon({ valueName, style }: Props) {
  return (
    <>
      { valueName === 'achievement' && <img src="/personal_values/small/achievement.gif" alt="achievement icon" style={style} /> }
      { valueName === 'benevolence' && <img src="/personal_values/small/benevolence.gif" alt="benevolence icon" style={style} /> }
      { valueName === 'conformity' && <img src="/personal_values/small/conformity.gif" alt="conformity icon" style={style} /> }
      { valueName === 'hedonism' && <img src="/personal_values/small/hedonism.gif" alt="hedonism icon" style={style} /> }
      { valueName === 'power' && <img src="/personal_values/small/power.gif" alt="power icon" style={style} /> }
      { valueName === 'security' && <img src="/personal_values/small/security.gif" alt="security icon" style={style} /> }
      { valueName === 'self direction' && <img src="/personal_values/small/self_direction.gif" alt="self_direction icon" style={style} /> }
      { valueName === 'stimulation' && <img src="/personal_values/small/stimulation.gif" alt="stimulation icon" style={style} /> }
      { valueName === 'tradition' && <img src="/personal_values/small/tradition.gif" alt="tradition icon" style={style} /> }
      { valueName === 'universalism' && <img src="/personal_values/small/universalism.gif" alt="universalism icon" style={style} /> }
    </>
  );
}

export default PersonalValueIcon;
