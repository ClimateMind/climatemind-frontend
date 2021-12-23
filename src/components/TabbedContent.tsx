import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Tabs, Tab } from '@material-ui/core/';
import { TAction } from '../types/Actions';
import DescriptionIcon from '@material-ui/icons/Description';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Box from '@material-ui/core/Box';
import { COLORS } from '../common/styles/CMTheme';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(3),
  },
  tabs: {
    marginBottom: theme.spacing(2),
  },
  tab: {
    textTransform: 'capitalize',
    paddingBottom: theme.spacing(2),
    color: COLORS.ICON_LIGHT,
    '&.Mui-selected': {
      color: COLORS.DK_TEXT,
    },
  },
  icon: {
    marginBottom: '0 !important',
  },
}));

export interface TabbedContentProps {
  action?: TAction;
  details?: React.ReactNode;
  sources?: React.ReactNode;
  tabOneName?: string;
  tabTwoName?: string;
}

export const TabbedContent: React.FC<TabbedContentProps> = ({
  details,
  sources,
  tabOneName = 'Details',
  tabTwoName = 'Sources',
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        aria-label="scrollable force tabs example"
        classes={{ root: classes.tabs }}
      >
        <Tab
          label={tabOneName}
          icon={<AssignmentIcon className={classes.icon} />}
          {...a11yProps(0)}
          className={classes.tab}
        />
        <Tab
          label={tabTwoName}
          icon={<DescriptionIcon className={classes.icon} />}
          {...a11yProps(1)}
          className={classes.tab}
        />
      </Tabs>

      <TabPanel value={value} index={0}>
        {details}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {sources}
      </TabPanel>
    </div>
  );
};

export default TabbedContent;
