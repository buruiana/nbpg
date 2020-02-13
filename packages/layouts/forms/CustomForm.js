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

  const currentTemplate = useSelector(projectSelectors.currentTemplateSelector) || []

  const getTemplateForm = () => {
    let templateForm = {}
    get(currentTemplate, 'templateFiles', []).map(e => {
      e.fileForms.filter(form => {
        if (form.formName === currentModal.type) {
          templateForm = form
        }
      })
    })
    return templateForm
  }

  const currentForm = !isEmpty(customForms[currentModal.type])
    ? customForms[currentModal.type]
    : getTemplateForm()

  if (isEmpty(get(currentForm, 'formSchema', {}))) {
    dispatch(setError('Missing schema'))
    return null
  }

  let schema = {}
  let uiSchema = {}

  try {
    schema = new Function(
      '_', 'collections',  'selectedElement',
      currentForm.formSchema)(_, collections, currentTemplate) || {}
      uiSchema = new Function(
      '_', 'collections',
      currentForm.formUiSchema)(_, collections) || {}
  } catch (error) {
    dispatch(setError(error.message))
  }

  const onSubmit = ({ formData }) => {
    const newForms = {
      ...customForms,
      [currentForm.formName]: formData
    }
    dispatch(setCustomForms(newForms))
    dispatch(generateCode({ currentTemplate, customForms: newForms}))
    dispatch(removeModal())
  }

  return (
    <Container maxWidth="md">
      <Form
        schema={schema}
        onSubmit={onSubmit}
        formData={currentForm}
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
