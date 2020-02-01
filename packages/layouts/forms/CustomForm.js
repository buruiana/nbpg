import {
  setCustomForms,
  modalSelectors,
  projectSelectors,
  removeModal,
  setError,
} from '@bpgen/services'
import React from 'react'
import { withTheme } from 'react-jsonschema-form'
import { useDispatch, useSelector } from 'react-redux'
import { Theme as MuiTheme } from 'rjsf-material-ui'
import Button from '@material-ui/core/Button'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import Container from '@material-ui/core/Container'

const CustomForm = () => {
  const dispatch = useDispatch()
  const Form = withTheme(MuiTheme)

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

  const schema = new Function(currentForm.formSchema)()
  const uiSchema = new Function(currentForm.formUISchema)()

  const onSubmit = ({ formData }) => {
    const newForms = {
      ...customForms,
      [currentForm.formName]: formData
    }
    dispatch(setCustomForms(newForms))
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
