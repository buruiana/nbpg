import React from 'react'
import ProjectSettings from '@bpgen/layouts/modals/ProjectSettings'
import ComponentInfo from '@bpgen/layouts/modals/ComponentInfo'
import ComponentProps from '@bpgen/layouts/modals/ComponentProps'
import CustomForm from '@bpgen/layouts/forms/CustomForm'

export const getModalComponent = modals => {
  const currentModal = modals[modals.length - 1]

  switch (currentModal.type) {
    case 'projectSettings':
      return <ProjectSettings />
    case 'component_info':
      return <ComponentInfo />
    case 'component_props':
      return <ComponentProps />
    default:
      return <CustomForm />
  }
}