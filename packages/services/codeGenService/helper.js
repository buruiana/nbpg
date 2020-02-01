import get from "lodash/get"

const helper = ''

export const executeCodeGeneration = (currentTemplate, customForms) => {
  let codeFile = []

  get(currentTemplate, 'templateFiles', []).map(file => {
    let code = ""

    get(file, 'fileBlocks', []).map(block => {
      if (block.blockImplementation) {
        code += new Function("forms", "helper", block.blockImplementation)(customForms, helper)
      }

    })

    codeFile.push({
      id: file.fileName,
      code
    })
  })

  return codeFile
}
