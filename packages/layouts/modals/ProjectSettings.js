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
  const technos = get(collections.filter(e => e.title === 'technos'), '[0].data', [])
  const getTemplatesTypesEnum = () => templates.map(e => e.id)
  const getTechnosEnum = () => technos.map(e => e.id)
  const getTemplatesTypesEnumNames = () => templates.map(e => e.title)
  const getTechnosEnumNames = () => technos.map(e => e.title)

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
      techno: {
        type: "string",
        title: 'Techno',
        enum: getTechnosEnum(),
        enumNames: getTechnosEnumNames(),
      },
      template: {
        type: "string",
        title: 'Template',
        enum: getTemplatesTypesEnum(),
        enumNames: getTemplatesTypesEnumNames(),
      }
    }
  }

  const uiSchema = {
    template: {
      "ui:placeholder": "Choose a template"
    },
    techno: {
      "ui:placeholder": "Choose a techno"
    },
  }

  const onSubmit = ({ formData }) => {
    const projectSettings = formData
    const currentTemplate = get(templates.filter(e => e.id === formData.template), '[0]', [])
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
