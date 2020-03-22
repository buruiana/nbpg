import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addModal } from '@bpgen/services'
import CustomNavBar from '@bpgen/layouts/components/CustomNavBar'
import SortTree from '../components/SortTree'
import SaveIcon from '@material-ui/icons/Save'
import ImportExportIcon from '@material-ui/icons/ImportExport'
import SettingsIcon from '@material-ui/icons/Settings'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import {
  projectSelectors,
  collectionSelectors,
  codeGenSelectors,
  updateItem,
  getCollections,
  setInfo,
  setCurrentProject,
  exportFiles,
  setCode,
} from '@bpgen/services'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import Search from '@bpgen/layouts/components/Search'
import Ace from '@bpgen/layouts/components/Ace'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  right1: {
    width: '100%',
  }
}))

const Editor = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const projectSettings = useSelector(projectSelectors.projectSettingsSelector) || []
  const currentProject = useSelector(projectSelectors.currentProjectSelector) || []
  const collections = useSelector(collectionSelectors.collectionSelector) || []
  const code = useSelector(codeGenSelectors.codeGenSelector) || []
  const projectsCollection = get(collections.filter(e => e.title === 'projects'), [0], {})
  const projectsData = get(projectsCollection, 'data', [])
  const currentTemplate = useSelector(projectSelectors.currentTemplateSelector) || {}
  const isComponentTemplate = currentTemplate.templateIsComponent || false

  // if (isEmpty(projectSettings)) {
  //   dispatch(addModal({ type: 'projectSettings', data: {} }))
  //   return null
  // }

  const onClick = () => dispatch(addModal({ type: 'projectSettings', data: {} }))
  const save = () => {
    const newProject = { ...currentProject }

    newProject.id = newProject.projectSettings.title
    newProject.title = newProject.projectSettings.title

    const isUpdate = !isEmpty(projectsData.filter(e => e.title === newProject.title))

    let newData = []
    if (isUpdate) {
      newData = projectsData.map(e => {
        return e.projectSettings.title === newProject.projectSettings.title
          ? newProject
          : e
      })
    } else {
      newData = [...projectsData]
      newData.push(newProject)
    }

    const newProjectCollection = {
      ...projectsCollection,
      data: newData,
    }

    dispatch(updateItem({ type: 'collections', data: newProjectCollection }))
    dispatch(getCollections())
    dispatch(setInfo('Collection saved'))
  }

  const exportProjectFiles = () => {
    const data = {
      id: 'all',
      code,
      dest: projectSettings.destination
    }
    dispatch(exportFiles({ data }))
  }

  const initProject = () => {
    dispatch(setCurrentProject({}))
    dispatch(setCode({}))
  }

  return (
    <div className={classes.root}>
      <CustomNavBar />
      <Grid container spacing={3}>
        {
          isComponentTemplate &&
          <Grid item md={10}>
            <div className='left'>
              <Search searchFields={['keyword', 'technos', 'providers']} />
            </div>
          </Grid>
        }
        <Grid item md={isComponentTemplate ? 2 : 12}>
          <div className='right'>
            <AutorenewIcon
              onClick={initProject}
              color='primary'
              fontSize='large'
              className='generic_link'
            />
            <SaveIcon
              onClick={save}
              color='primary'
              fontSize='large'
              className='generic_link'
            />
            <ImportExportIcon
              onClick={exportProjectFiles}
              color='primary'
              fontSize='large'
              className='generic_link'
            />
            <SettingsIcon
              onClick={onClick}
              color='primary'
              fontSize='large'
              className='generic_link'
            />
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {
          isComponentTemplate &&
          <Grid item md={8}>
            <SortTree />
          </Grid>
        }
        <Grid item md={isComponentTemplate ? 4 : 12}>
          <Ace />
        </Grid>
      </Grid>
    </div>
  )
}

export default Editor

