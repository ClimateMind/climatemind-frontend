import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Tabs, Tab } from '@material-ui/core/';
import { TAction } from '../types/Actions';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Box from '@material-ui/core/Box';

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
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export interface TabbedContentProps {
  action: TAction;
}

export const TabbedContent: React.FC<TabbedContentProps> = ({ action }) => {
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
        variant="scrollable"
        aria-label="scrollable force tabs example"
      >
        <Tab label="Details" icon={<AssignmentIcon />} {...a11yProps(0)} />
        <Tab label="Sources" icon={<DescriptionIcon />} {...a11yProps(1)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Typography>{action.shortDescription}</Typography>
        <Typography>{action.longDescription}</Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        No Sources Yet
      </TabPanel>
    </div>
  );
};

export default TabbedContent;
