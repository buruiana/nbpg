import Alert from '@material-ui/lab/Alert'
import React from 'react'
import { projectSelectors, resetAlert } from '@bpgen/services'
import { useDispatch, useSelector } from 'react-redux'

const CustomAlert = () => {
  const dispatch = useDispatch()
  const error = useSelector(projectSelectors.errorSelector)
  const info = useSelector(projectSelectors.infoSelector)

  const onClose = () => dispatch(resetAlert())
  setTimeout(() => onClose(), 5000)

  if (!error && !info) return null
  const severity = error ? 'error' : 'success'

  return <Alert severity={severity} onClose={onClose}>{error || info}</Alert>
}

export default CustomAlert
