import {
  removeModal,
  projectSelectors,
  collectionSelectors,
  setCurrentTab,
  setProjectSettings,
  setCurrentTemplate,
  setAceTabs,
} from '@bpgen/services'
import React from 'react'
import { withTheme } from 'react-jsonschema-form'
import { useDispatch, useSelector } from 'react-redux'
import { Theme as MuiTheme } from 'rjsf-material-ui'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import get from 'lodash/get'

const ProjectSettings = props => {
  const dispatch = useDispatch()
  const currentProject = useSelector(projectSelectors.currentProjectSelector) || []
  const collections = useSelector(collectionSelectors.collectionSelector) || []

  const templates = get(collections.filter(e => e.title === 'templates'), '[0].data', [])
  const getTemplatesTypeEnums = () => templates.map(e => e.title)

  const Form = withTheme(MuiTheme)

  const schema = {
    type: "object",
    required: ['title', 'template'],
    properties: {
      title: {
        type: "string",
        title: "Project Title",
        default: get(currentProject.title, '')
      },
      destination: {
        type: "string",
        title: 'Destination',
        default: get(currentProject.destination, '')
      },
      template: {
        type: "string",
        title: 'Template',
        enum: getTemplatesTypeEnums(),
      }
    }
  }

  const uiSchema = {
    template: {
      "ui:placeholder": "Choose a template"
     },
  }

  const onSubmit = ({ formData }) => {
    const projectSettings = formData
    const currentTemplate = get(templates.filter(e => e.title === formData.template), '[0]', [])
    const aceTabs = get(currentTemplate, 'templateFiles', [])
      .filter(file => file.fileIsActive)
      .map(file => file.fileName)

    dispatch(setProjectSettings(projectSettings))
    dispatch(setCurrentTemplate(currentTemplate))
    dispatch(setAceTabs(aceTabs))
    dispatch(setCurrentTab(aceTabs[0]))

    dispatch(removeModal())
  }
  const onChange = () => undefined

  return (
    <Container maxWidth="md">
      <div>
        <Form
          schema={schema}
          onSubmit={onSubmit}
          onChange={onChange}
          formData={get(currentProject, 'projectSettings', {})}
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
      </div>
    </Container>
  )
}

export default ProjectSettings
