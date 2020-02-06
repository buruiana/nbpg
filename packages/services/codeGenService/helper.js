import get from "lodash/get"
import isEmpty from 'lodash/isEmpty'
import * as _ from 'lodash'

const helper = ''

export const executeCodeGeneration = (currentTemplate, customForms) => {
  let codeFile = []

  get(currentTemplate, 'templateFiles', []).map(file => {
    let code = ""

    get(file, 'fileBlocks', []).map(block => {
      if (block.blockImplementation) {
        code += new Function("_", "forms", "helper", block.blockImplementation)(_, customForms, helper)
      }

    })

    codeFile.push({
      id: file.fileName,
      code
    })
  })

  return codeFile
}
