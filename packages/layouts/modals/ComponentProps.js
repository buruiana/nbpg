import React from "react"
import { Theme as MuiTheme } from 'rjsf-material-ui'
import isEmpty from "lodash/isEmpty"
import get from "lodash/get"
import { changeNodeAtPath } from "react-sortable-tree"
import {
  projectSelectors,
  modalSelectors,
  setProjectTree,
  removeModal,
  generateCode,
} from '@bpgen/services'
import { withTheme } from 'react-jsonschema-form'
import { useDispatch, useSelector } from 'react-redux'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

const getNodeKey = ({ treeIndex }) => treeIndex

const ComponentProps = props => {
  const dispatch = useDispatch()
  const Form = withTheme(MuiTheme)

  const modals = useSelector(modalSelectors.modalSelector) || []
  const currentProject = useSelector(projectSelectors.currentProjectSelector) || []
  const customForms = useSelector(projectSelectors.customFormsSelector) || {}
  const currentTemplate = useSelector(projectSelectors.currentTemplateSelector) || {}
  const { data: { node, path }} = modals[modals.length - 1]

  const tree = currentProject.projectTree
  const forms = customForms

  const uiSchema = { componentProps: {} }
  const schema = {
    type: "object",
    properties: {}
  }
  const properties = schema.properties
  const propsInfo = get(node, "componentProps", [])

  propsInfo.map(prop => {
    const { title, propTypeVal, val, propTypeProp } = prop

    if (get(prop, 'propTypeProp', '').includes('boolean')) {
      const propEnum = ['true', 'false']

      properties[title] = {
        type: "string",
        title: title,
        enum: propEnum,
        default: val
      }

      uiSchema[title] = {
        "ui:placeholder": "Select",
        "ui:options": {
          label: true
        }
      }
    } else if (get(prop, 'propTypeProp', '').includes('enum')) {
      const propEnum = propTypeVal.replace(/'/g, '').split('|')

      properties[title] = {
        type: "string",
        title: title,
        enum: propEnum,
        default: val
      }

      uiSchema[title] = {
        "ui:placeholder": "Select",
        "ui:options": {
          label: true
        }
      }
    } else {
      properties[title] = {
        type: "string",
        title: title,
        default: val
      }
    }
  })

  const onSubmit = ({ formData }) => {
    const newProps = []

    propsInfo.map(e => {
      newProps.push({ ...e, val: formData[e.title] })
    })

    const newNode = { ...node }
    newNode.componentProps = newProps
    const hasComponentPropsVals = newProps.filter(el => el.val)
    newNode.hasComponentPropsVals = !isEmpty(hasComponentPropsVals)

    const newTree = changeNodeAtPath({
      treeData: tree,
      path,
      getNodeKey,
      newNode
    })

    dispatch(setProjectTree(newTree))
    dispatch(generateCode({ currentProject}))
    dispatch(removeModal())
  }

  const log = type => console.log.bind(console, type)
  return (
    <Container maxWidth="md">
      <Form
        schema={schema}
        uiSchema={uiSchema}
        onChange={log("changed")}
        onSubmit={onSubmit}
        onError={log("errors")}
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

export default ComponentProps
