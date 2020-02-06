import { createSelector } from "@reduxjs/toolkit"

const currentProject = state => state.projectServiceReducer.currentProject
const projects = state => state.projectServiceReducer.projects
const projectSettings = state => state.projectServiceReducer.currentProject.projectSettings
const projectTree = state => state.projectServiceReducer.currentProject.projectTree
const customForms = state => state.projectServiceReducer.currentProject.customForms
const currentTemplate = state => state.projectServiceReducer.currentProject.currentTemplate
const aceTabs = state => state.projectServiceReducer.currentProject.aceTabs
const currentTab = state => state.projectServiceReducer.currentProject.currentTab
const error = state => state.projectServiceReducer.error
const info = state => state.projectServiceReducer.info

export const currentProjectSelector = createSelector(
  currentProject,
  items => items
)

export const projectSelector = createSelector(
  projects,
  items => items
)

export const projectSettingsSelector = createSelector(
  projectSettings,
  items => items
)

export const projectTreeSelector = createSelector(
  projectTree,
  items => items
)

export const customFormsSelector = createSelector(
  customForms,
  items => items
)

export const currentTemplateSelector = createSelector(
  currentTemplate,
  items => items
)

export const aceTabsSelector = createSelector(
  aceTabs,
  items => items
)

export const currentTabSelector = createSelector(
  currentTab,
  items => items
)

export const errorSelector = createSelector(
  error,
  items => items
)

export const infoSelector = createSelector(
  info,
  items => items
)
