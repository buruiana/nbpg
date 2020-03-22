import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { useDispatch, useSelector } from 'react-redux'
import {
  collectionSelectors,
  searchSelectors,
  setSearch,
} from '@bpgen/services'

import get from 'lodash/get'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: { marginTop: theme.spacing(2) },
}))

const Search = ({ searchFields='' }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const searchData = useSelector(searchSelectors.searchSelector) || {}
  const collections = useSelector(collectionSelectors.collectionSelector) || []

  const technos = collections.filter(e => e.title === 'technos')
  const providers = collections.filter(e => e.title === 'providers')

  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)

  useEffect(() => {
    setLabelWidth(get(inputLabel, 'current.offsetWidth', 0))
  }, [])

  const handleChange = event => {
    dispatch(setSearch({ ...searchData, [event.target.name]: event.target.value }))
  }

  const getTechnos = () => {
    return get(technos, '[0].data', []).map(e => {
      return (
        <MenuItem value={e.id} key={e.title}>{e.title}</MenuItem>
        )
    })
  }
  const getProviders = () => {
    return get(providers, '[0].data', []).map(e => {
      return (
        <MenuItem value={e.id} key={e.title}>{e.title}</MenuItem>
      )
    })
  }

  return (
    <>
      {
        searchFields.includes('keyword') &&
        <FormControl variant='filled' className={classes.formControl}>
          <TextField
            name='keyword'
            label='Search'
            variant='outlined'
            onChange={handleChange}
          />
        </FormControl>
      }
      {
        searchFields.includes('technos') &&
        <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel
            ref={inputLabel}
            id='techno_label'
          >
            Technos
        </InputLabel>
          <Select
            labelId='demo-simple-select-outlined-label'
            name='techno'
            value={searchData.techno || 'all'}
            onChange={handleChange}
            labelWidth={labelWidth}
          >
            <MenuItem value='all'>
              <em>All</em>
            </MenuItem>
            {getTechnos()}
          </Select>
        </FormControl>
      }
      {
        searchFields.includes('providers') &&
        <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel
            ref={inputLabel}
            id='provider_label'>
            Providers
          </InputLabel>
          <Select
            labelId='demo-simple-select-outlined-label'
            name='provider'
            value={searchData.provider || 'all'}
            onChange={handleChange}
            labelWidth={labelWidth}
          >
            <MenuItem value='all'>
              <em>All</em>
            </MenuItem>
            {getProviders()}
          </Select>
        </FormControl>
      }
    </>
  )
}

export default Search