import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Cod from './payment/Cod';
import Googlepay from './payment/Googlepay'
import Creditcard from './payment/Creditcard'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 3,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 250,
    width:600
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root} className="d-flex justify-content-center" >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Google pay" {...a11yProps(0)} className="font-weight-bold text-dark"/>
        <Tab label="Credit Card" {...a11yProps(1)} className="font-weight-bold text-dark"/>
        <Tab label="Cash on Delivery" {...a11yProps(2)} className="font-weight-bold text-dark"/>
        
      </Tabs>
      <TabPanel value={value} className="w-50"  index={0}>
      <Googlepay/>
      </TabPanel>
      <TabPanel value={value} className="w-50"  index={1}>
      <h3>N/A</h3>
      </TabPanel>
      <TabPanel value={value} className="w-50" index={2}>
      <Cod/>
      </TabPanel>
     
    </div>
  );
}
