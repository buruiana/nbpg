import get from 'lodash/get'
import * as _ from 'lodash'
import * as helper from './utils/helper'

export const executeCodeGeneration = (currentProject) => {
  let codeFile = []

  get(currentProject, 'currentTemplate.templateFiles', []).map(file => {
    let code = ''

    get(file, 'fileBlocks', []).map(block => {
      if (block.blockImplementation) {
        code += new Function('_', 'currentProject', 'helper', block.blockImplementation)(
          _, currentProject, helper
        )
      }

    })

    codeFile.push({
      id: file.fileName,
      code
    })
  })

  return codeFile
}
