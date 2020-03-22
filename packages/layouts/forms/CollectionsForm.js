import {
  createItem,
  updateItem,
  getCollections,
  collectionSelectors
} from '@bpgen/services'
import React from 'react'
import { withTheme } from 'react-jsonschema-form'
import { useDispatch, useSelector } from 'react-redux'
import { Theme as MuiTheme } from 'rjsf-material-ui'
import Button from '@material-ui/core/Button'

const CollectionsForm = props => {
  const { navigate, id } = props
  const collections = useSelector(collectionSelectors.collectionSelector) || []
  const selected = collections.filter(e => e._id === id)[0] || []

  const Form = withTheme(MuiTheme)
  const dispatch = useDispatch()
  const schema = {
    type: 'object',
    properties: {
      _id: { type: 'string', title: 'Id' },
      title: { type: 'string', title: 'Name' },
      description: { type: 'string', title: 'Description' },
      searchFields: { type: 'string', title: 'searchFields' },
      jfSchema: { type: 'string', title: 'Schema' },
      jfUiSchema: { type: 'string', title: 'UISchema' },
    }
  }

  const uiSchema = {
    _id: { 'ui:widget': 'hidden' },
    jfSchema: {
      'ui:widget': 'textarea',
      'ui:options': {
        rows: 15
      }
    },
    jfUiSchema: {
      'ui:widget': 'textarea',
      'ui:options': {
        rows: 15
      }
    }
  }

  const onSubmit = ({ formData }) => {
    formData._id
      ? dispatch(updateItem({ type: 'collections', data: formData }))
      : dispatch(createItem({ type: 'collections', data: formData }))
    dispatch(getCollections())
    navigate('/list')
  }
  const onChange = () => undefined

  return (
    <div>
      <Button
        onClick={() => navigate(`/list`)}
        component='button'
        color='secondary'
      >
        Back
      </Button>
      <Form
        schema={schema}
        onSubmit={onSubmit}
        onChange={onChange}
        formData={selected}
        uiSchema={uiSchema}
      >
        <div className='padd_top_bott'>
          <Button
            variant='contained'
            color='primary'
            type='submit'
          >
            Submit
        </Button>
        </div>
      </Form>
    </div>
  )
}

export default CollectionsForm
