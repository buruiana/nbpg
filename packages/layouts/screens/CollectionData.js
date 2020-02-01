import React from "react"
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { DeleteRounded } from '@material-ui/icons'

import StorageIcon from '@material-ui/icons/Storage'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

import { useSelector, useDispatch } from 'react-redux'

import {
  updateItem,
  getCollections,
  collectionSelectors,
  setProjectSettings,
  setCustomForms,
  setCurrentTemplate,
  setProjectTree,
  generateCode,
  setCurrentTab,
  setAceTabs,
} from '@bpgen/services'
import capitalize from 'lodash/capitalize'
import get from 'lodash/get'

import '../styles.scss'

const CollectionData = props => {
  const { id, navigate } = props
  const dispatch = useDispatch()

  const collections = useSelector(collectionSelectors.collectionSelector) || []
  const selectedCollection = get(collections.filter(e => e._id === id), '[0]', [])

  const data = get(selectedCollection, 'data', [])
  const getId = row => row.id || row.title

  const addNew = () => navigate(`/editdata/${id}/new`)
  const deleteCollectionData = item => {
    const data = get(selectedCollection, 'data', []).filter(e => e.id !== item)
    const newCollection = {
      ...selectedCollection,
      data,
    }

    dispatch(updateItem({ type: 'collections', data: newCollection }))
    dispatch(getCollections())
    navigate(`/data/${id}`)
  }

  const onClick = row => {
    if (selectedCollection.title === 'projects') {
      dispatch(setProjectSettings(row.projectSettings))
      dispatch(setCustomForms(row.customForms))
      dispatch(setProjectTree(row.projectTree))
      dispatch(setCurrentTemplate(row.currentTemplate))
      dispatch(setAceTabs(row.aceTabs))
      dispatch(setCurrentTab(row.currentTab))
      dispatch(generateCode({ currentTemplate: row.currentTemplate, customForm: row.customForm }))
      navigate('/editor')
    } else {
      navigate(`/editdata/${id}/${getId(row)}`)
    }
  }

  return (
    <div className='test'>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <Button
            onClick={() => navigate(`/list`)}
            color='secondary'
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">
            {capitalize(selectedCollection.title)} Data
          </Typography>
        </Grid>
        {selectedCollection.title !== 'projects' &&
          <Grid item xs={5} className='rightButton'>
            <AddCircleOutlineIcon
              onClick={addNew}
              color='primary'
              fontSize="large"
              className='generic_link'
            />
          </Grid>
        }
        <TableContainer component={Paper}>
          <Table className='table' aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(row => (
                <TableRow key={row.title}>
                  <TableCell>{row.title}</TableCell>
                  <TableCell align="right">
                    <DeleteRounded
                      onClick={() => deleteCollectionData(row.id)}
                      color='primary'
                      className='generic_link'
                    />
                    <StorageIcon
                      color='primary'
                      onClick={() => onClick(row)}
                      className='generic_link'
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  )
}

export default CollectionData
