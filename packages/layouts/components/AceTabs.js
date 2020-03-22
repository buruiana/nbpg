import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentTab, projectSelectors } from '@bpgen/services'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}))

const AceTabs = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentTab = useSelector(projectSelectors.currentTabSelector) || []
  const aceTabs = useSelector(projectSelectors.aceTabsSelector) || []

  const handleChange = (event, newValue) => {
    dispatch(setCurrentTab(aceTabs[newValue]))
  }

  const renderTabs = () => {
    return aceTabs.map(e => {
      return (
        <Tab
          label={e}
          key={aceTabs.indexOf(e)}
        />
      )
    })
  }

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Tabs value={aceTabs.indexOf(currentTab)} onChange={handleChange} aria-label='simple tabs example'>
          {renderTabs()}
        </Tabs>
      </AppBar>
    </div>
  )
}

export default AceTabs