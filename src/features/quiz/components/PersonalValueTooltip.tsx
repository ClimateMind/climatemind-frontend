import { PropsWithChildren } from 'react';

import { capitalizeFirstLetter } from 'helpers/capitalizeFirstLetter';
import { personalValueTooltips } from 'shared/assets/personal-value-tool-tips';
import { CmTooltip, CmTypography } from 'shared/components';

interface Props extends PropsWithChildren {
  value: string;
}

function PersonalValueTooltip({ children, value }: Props) {
  return (
    <CmTooltip
      title={
        <div>
          <CmTypography variant="body" style={styles.header}>{capitalizeFirstLetter(value)}</CmTypography>
          <CmTypography variant="body">{personalValueTooltips[value]}</CmTypography>
        </div>
      }
      placement="top"
      arrow
      PopperProps={{ style: { maxWidth: 200 } }}
    >
      <div style={{ display: 'inline-block' }}>{children}</div>
    </CmTooltip>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    fontWeight: 800,
    marginBottom: 10,
  },
};

export default PersonalValueTooltip;
