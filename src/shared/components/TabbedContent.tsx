import { useState } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIcon from '@mui/icons-material/Assignment';

import CmTabs from './CmTabs';
import CmTab from './CmTab';

interface Props {
  details: React.ReactNode;
  sources: React.ReactNode;
  tabOneName?: string;
  tabTwoName?: string;
}

function TabbedContent({ details, sources, tabOneName = 'Details', tabTwoName = 'Sources' }: Props) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div style={{flexGrow: 1,
      width: '100%',}}>
      <CmTabs value={selectedTab} onChange={(newValue => setSelectedTab(newValue))}>
        <CmTab label={tabOneName} icon={<AssignmentIcon />} />
        <CmTab label={tabTwoName} icon={<DescriptionIcon />} />
      </CmTabs>

      {selectedTab === 0 && <div>{details}</div>}
      {selectedTab === 1 && <div>{sources}</div>}
    </div>
  );
};

export default TabbedContent;
