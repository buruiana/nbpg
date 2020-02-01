export const getFlatForms = files => {
  let flatForms = []
  files.map(file => {
    file.fileForms.map(form => {
      flatForms.push(form)
    })
  })

  return flatForms
}
