import { createSlice } from '@reduxjs/toolkit'
import * as selectors from './selectors'
import * as helper from './helper'

const projectService = createSlice({
  name: 'project',
  initialState: {
    currentProject: {
      projectTree: [],
      projectSettings: {},
      customForms: [],
      aceTabs: [],
      currentTab: '',
    },
    projects: [],
    error: '',
    info: '',
  },
  reducers: {
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload
    },
    setProjects: (state, action) => {
      state.projects= action.payload
    },
    setProjectSettings: (state, action) => {
      state.currentProject.projectSettings = action.payload
    },
    setProjectTree: (state, action) => {
      state.currentProject.projectTree = action.payload
    },
    setCustomForms: (state, action) => {
      state.currentProject.customForms = action.payload
    },
    setCurrentTemplate: (state, action) => {
      state.currentProject.currentTemplate = action.payload
    },
    setAceTabs: (state, action) => {
      state.currentProject.aceTabs = action.payload
    },
    setCurrentTab: (state, action) => {
      state.currentProject.currentTab = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setInfo: (state, action) => {
      state.info = action.payload
    },
    resetAlert: (state, action) => {
      state.info = ''
      state.error = ''
    },
  }
})

const { actions, reducer } = projectService
export const {
  setCurrentProject,
  setProjects,
  setProjectSettings,
  setProjectTree,
  setCustomForms,
  setCurrentTemplate,
  setAceTabs,
  setCurrentTab,
  setError,
  setInfo,
  resetAlert,
} = actions
export { reducer as projectServiceReducer }
export { selectors as projectSelectors }
export { helper as projectHelper }

