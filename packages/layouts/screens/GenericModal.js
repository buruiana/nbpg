import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'

import { useDispatch, useSelector } from 'react-redux'
import { modalSelectors, modalHelper, removeModal } from '@bpgen/services'
import isEmpty from 'lodash/isEmpty'

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    padding: 2,
    flex: 1,
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function FullScreenDialog() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const modals = useSelector(modalSelectors.modalSelector) || []
  if (isEmpty(modals)) return null
  const currentModal = modals[modals.length-1]

  const handleClose = () => dispatch(removeModal())

  return (
    <Container maxWidth="xl">
      <Dialog
        maxWidth='xl'
        open={true}
        fullWidth={true}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" >{currentModal.type}</Typography>
          </Toolbar>
        </AppBar>
        {modalHelper.getModalComponent(modals)}
      </Dialog>
    </Container>
  )
}