import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import {
  projectSelectors,
  addModal,
} from '@bpgen/services'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import '../styles.scss'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const CustomNavBar = () => {

  const classes = useStyles()
  const dispatch = useDispatch()

  const currentTemplate = useSelector(projectSelectors.currentTemplateSelector) || []
  if (isEmpty(currentTemplate)) return null

  const openModalForm = e => dispatch(addModal({ type: e, data: currentTemplate }))

  const getTemplateForms = () => {
    return get(currentTemplate, 'templateFiles', []).map(file => {
      return get(file, 'fileForms', []).map(form => {
        return (
          form.formIsActive && (
            <Button
              color='inherit'
              onClick={() => openModalForm(form.formName)}
              key={form.formName}
              name={form.formName}
              id={form.formName}
            >
              {form.formName}
            </Button>
          )
        )
      })
    })
  }

  return (
    <div className={classes.root}>
      <Toolbar>
        {getTemplateForms()}
      </Toolbar>
    </div>
  )
}

export default CustomNavBar
