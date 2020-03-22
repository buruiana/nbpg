import React from 'react'
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
import isEmpty from 'lodash/isEmpty'
import StorageIcon from '@material-ui/icons/Storage'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import Search from '@bpgen/layouts/components/Search'
import { useSelector, useDispatch } from 'react-redux'

import {
  updateItem,
  getCollections,
  collectionSelectors,
  setCurrentProject,
  generateCode,
  searchSelectors,
} from '@bpgen/services'

import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import '../styles.scss'

const CollectionData = props => {
  const { id, navigate } = props
  const dispatch = useDispatch()

  const collections = useSelector(collectionSelectors.collectionSelector) || []
  const selectedCollection = get(collections.filter(e => e._id === id), '[0]', [])
  const searchData = useSelector(searchSelectors.searchSelector) || {}
  const data = get(selectedCollection, 'data', [])
  const getId = row => row.id || row.title

  const filteredData = () => {
    const filtered = data.filter(el => {
      if (get(searchData, 'keyword', '')) {
        return (el.title.toLowerCase().indexOf(searchData.keyword.toLowerCase()) !== -1) &&
          (
            get(searchData, 'provider', el.provider) === el.provider ||
            get(searchData, 'provider', 'all') === 'all'
          )
          &&
          (
            get(searchData, 'techno', el.techno) === el.techno ||
            get(searchData, 'techno', 'all') === 'all'
          )
      }
      return (
        (
          get(searchData, 'provider', el.provider) === el.provider ||
          get(searchData, 'provider', 'all') === 'all'
        )
        &&
        (
          get(searchData, 'techno', el.techno) === el.techno ||
          get(searchData, 'techno', 'all') === 'all'
        )
      )
    })

    return sortBy(filtered, el => el.title)
  }

  const addNew = row => {
    !isEmpty(row)
      ? navigate(`/editdata/${id}/new`, { state: { row }})
      : navigate(`/editdata/${id}/new`)
  }

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
      dispatch(setCurrentProject(row))
      dispatch(generateCode({ currentProject: row }))
      navigate('/editor')
    } else {
      navigate(`/editdata/${id}/${getId(row)}`)
    }
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <Button
            onClick={() => navigate(`/list`)}
            color='secondary'
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Typography variant='h6'>
            {get(selectedCollection, 'title', '').toUpperCase()} DATA
          </Typography>
        </Grid>
        {
          selectedCollection.title !== 'projects' &&
          <Grid item xs={4} className='rightButton'>
            <AddCircleOutlineIcon
              onClick={addNew}
              color='primary'
              fontSize='large'
              className='generic_link'
            />
          </Grid>
        }
        {
          !isEmpty(filteredData()) &&
          <>
            <div className='right'>
              <Search searchFields={selectedCollection.searchFields}/>
            </div>
            <TableContainer component={Paper}>
              <Table className='table' aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align='right'>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData().map(row => (
                    <TableRow key={row.id}>
                      <TableCell>{row.title}</TableCell>
                      <TableCell align='right'>
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
                        <FileCopyIcon
                          onClick={() => addNew(row)}
                          color='primary'
                          className='generic_link'
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        }
      </Grid>
    </>
  )
}

export default CollectionData
