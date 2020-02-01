import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCollections, collectionSelectors, deleteItem } from '@bpgen/services'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import { DeleteRounded } from '@material-ui/icons'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import StorageIcon from '@material-ui/icons/Storage'

import Search from '@bpgen/layouts/components/Search'

const useStyles = makeStyles({
  table: { minWidth: 650 },
})

const CollectionList = props => {
  const { navigate } = props
  const dispatch = useDispatch()

  const collections = useSelector(collectionSelectors.collectionSelector) || []
  const classes = useStyles()

  const renderList = () => {
    const addNew = () => navigate('/form')
    const deleteCollection = id => {
      dispatch(deleteItem({ type: 'collections', data: id }))
      dispatch(getCollections())
    }

    return (
      <div>
        <div className='padd_bott'>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <div className='icon_wrapper'>
                <AddCircleOutlineIcon
                  onClick={addNew}
                  color='primary'
                  fontSize="large"
                  className='generic_link'
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className='right'>
                <Search />
              </div>
            </Grid>
          </Grid>
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {collections.map(row => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    <Link
                      onClick={() => navigate(`/form/${row._id}`)}
                      href="#"
                    >
                      {row.title}
                    </Link>
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell align="right">
                    <DeleteRounded
                      onClick={() => deleteCollection(row._id)}
                      color='primary'
                      className='generic_link'
                    />
                    <StorageIcon
                      color='primary'
                      onClick={() => navigate(`/data/${row._id}`)}
                      className='generic_link'
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }

  return <div>{renderList()}</div>
}

export default CollectionList
