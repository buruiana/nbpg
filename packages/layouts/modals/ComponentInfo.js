import {
  modalSelectors,
} from '@bpgen/services'
import React from 'react'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import { useSelector } from 'react-redux'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
  },
}))


const ProjectSettings = props => {
  const modals = useSelector(modalSelectors.modalSelector) || []
  const currentModal = modals[modals.length - 1]

  const {
    title,
    description,
    provider,
    techno,
    propType,
    componentProps=[],
  } = currentModal.data.node
  const classes = useStyles()

  const getComponentProps = () => {
    return componentProps.map(e => {
      return (
        <ExpansionPanel key={e.title}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography className={classes.heading}>{e.title} : {e.propTypeProp}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {e.description}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    })
  }

  return (
    <Container maxWidth='md'>
      <div className={classes.root}>
        <Typography variant='h2' className={classes.title}>
          {title}
        </Typography>
        <TextField
          id='provider'
          label='Provider'
          variant='outlined'
          color='secondary'
          defaultValue={provider} />
        <TextField
          id='techno'
          label='Techno'
          variant='outlined'
          color='secondary'
          defaultValue={techno} />
        <TextField
          id='propType'
          label='PropType'
          variant='outlined'
          color='secondary'
          defaultValue={propType} />
        <TextField
          id='description'
          label='Description'
          multiline
          rows='25'
          defaultValue={description}
          variant='outlined'
          fullWidth />

        <div className='padded'>
          <Typography variant='h4' className={classes.title}>Props</Typography>
          {getComponentProps()}
        </div>
      </div>
    </Container>
  )
}

export default ProjectSettings
