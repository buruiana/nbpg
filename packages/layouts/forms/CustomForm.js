import {
  setCustomForms,
  modalSelectors,
  projectSelectors,
  collectionSelectors,
  removeModal,
  setError,
  generateCode,
} from '@bpgen/services'
import React from 'react'
import { withTheme } from 'react-jsonschema-form'
import { useDispatch, useSelector } from 'react-redux'
import { Theme as MuiTheme } from 'rjsf-material-ui'
import Button from '@material-ui/core/Button'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import Container from '@material-ui/core/Container'
import * as _ from 'lodash'

const CustomForm = () => {
  const dispatch = useDispatch()
  const Form = withTheme(MuiTheme)
  const collections = useSelector(collectionSelectors.collectionSelector) || []
  const modals = useSelector(modalSelectors.modalSelector) || []
  const customForms = useSelector(projectSelectors.customFormsSelector) || []
  const currentModal = modals[modals.length - 1]

  const currentProject = useSelector(projectSelectors.currentProjectSelector) || []

  const getTemplateForm = () => {
    let templateForm = {}
    get(currentProject, 'currentTemplate.templateFiles', []).map(e => {
      get(e, 'fileForms', []).filter(form => {
        if (form.formName === currentModal.type) {
          templateForm = form
        }
      })
    })
    return templateForm
  }

  const currentForm = getTemplateForm()

  if (isEmpty(get(currentForm, 'formSchema', {}))) {
    dispatch(setError('Missing schema'))
    return null
  }
  let formData = customForms[currentForm.formName] || {}

  let schema = {}
  let uiSchema = {}

  try {
    schema = new Function(
      '_', 'collections',  'currentProject',
      currentForm.formSchema)(_, collections, currentProject) || {}
    uiSchema = new Function(
      '_', 'collections',
      currentForm.formUiSchema)(_, collections) || {}
    if(_.has(currentForm, 'formData')) {
      formData = new Function(
        '_', 'collections',  'currentProject',
        currentForm.formData)(_, collections, currentProject) || {}
    }
  } catch (error) {
    dispatch(setError(error.message))
  }

  const onSubmit = ({ formData }) => {
    dispatch(removeModal())
    const newForms = {
      ...customForms,
      [currentForm.formName]: formData
    }
    dispatch(setCustomForms(newForms))

    dispatch(generateCode({ 
      currentProject: { ...currentProject, customForms: newForms }
    }))
  }


  return (
    <Container maxWidth="md">
      <Form
        schema={schema}
        onSubmit={onSubmit}
        formData={formData}
        uiSchema={uiSchema}
      >
        <div className='padd_top_bott'>
          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default CustomForm
