import { getFlatDataFromTree } from "react-sortable-tree"
import get from "lodash/get"
import uniqBy from "lodash/uniqBy"
import has from "lodash/has"
import sortBy from "lodash/sortBy"
import groupBy from "lodash/groupBy"
import isEmpty from 'lodash/isEmpty'
import reverse from "lodash/reverse"
import * as lodash from 'lodash'

export const getFlatDataFromTree1 = getFlatDataFromTree
export const _ = lodash

export const getConstList = tree => {
  const flatData = getFlatDataFromTree({
    treeData: tree,
    getNodeKey: ({ treeIndex }) => treeIndex,
    ignoreCollapsed: false
  })

  let constList = []
  flatData.map(el => {
    return el.node.componentProps.filter(prop => {
      if (!isEmpty(prop.val) && get(prop, 'propTypeProp', []).includes('func')) {
        constList.push(prop.val.replace(/[\W_]+/g, ""))
      }
    })
  })

  return constList
}

export const getStylesList = tree => {
  const flatData = getFlatDataFromTree({
    treeData: tree,
    getNodeKey: ({ treeIndex }) => treeIndex,
    ignoreCollapsed: false
  })

  let stylesList = []

  flatData.map(el => {
    return el.node.componentProps.filter(prop => {
      if (!isEmpty(prop.val) && prop.title === 'style') {
        stylesList.push(prop.val.replace(/[\W_]+/g, ""))
      }
    })
  })

  return stylesList
}

export const getImportList = tree => {
  const flatData = getFlatDataFromTree({
    treeData: tree,
    getNodeKey: ({ treeIndex }) => treeIndex,
    ignoreCollapsed: false
  })

  const defaultImports = uniqBy(
    flatData.filter(
      el => get(el, 'node.isDefault', false)
    ),
    "node.componentImport"
  )
  const sortedDefaultImports = sortBy(defaultImports, "node.title")

  const nonDefaultImports = uniqBy(
    flatData.filter(
      el => !get(el, 'node.isDefault', false) && el.node.provider !== "html"
    ),
    "node.title"
  )

  const sortedNonDefaultImports = sortBy(nonDefaultImports, "node.title")

  const groupSortedNonDefaultImports = groupBy(
    sortedNonDefaultImports,
    "node.componentImport"
  )

  const importList = {
    sortedDefaultImports,
    groupSortedNonDefaultImports
  }

  return importList
}

export const getTree = flatTree => {
  let code = ""
  let parentsList = []
  let elIdx = 0

  const prepareTree = tree => {
    tree.map(el => {
      console.log('console: -----------------', el)
      const theTitle = el.node.title.replace("__", ".")
      const currentId = el.node.uniqId
      const nextEl = tree.length > elIdx + 1 ? tree[elIdx + 1] : null
      const hasChildren = !isEmpty(el.node.children)
      const hasComponentProps = !isEmpty(el.node.componentProps)
      const hasParent = !isEmpty(el.parentNode)
      const closeTag = hasChildren ? ">" : " />"
      // const isChildrenRequired = () => 
      //   !isEmpty(
      //     get(el, 'node.componentProps', [])
      //       .filter(
      //         el => get(el, 'title', '') === 'children' && get(el, 'propTypeIsRequired', false)
      //       )
      //   )

      //   console.log('console: isChildrenRequired', isChildrenRequired(), el.node.componentProps)

      // const closeTag = !hasChildren || !isChildrenRequired()
      //   ? !isChildrenRequired()
      //     ? ">" 
      //     : `>default text</ ${el.node.title}>`
      //   : " />"

      if (hasChildren) parentsList.push(theTitle)

      const getWrapper = type => {
        if (isEmpty(type)) return null
        if (type.includes('string') || type.includes('enum')) {
          return {
            START: "'",
            END: "'",
          }
        } else if (type.includes('object') || type.includes('func') || type.includes('bool')) {
          return {
            START: "{",
            END: "}",
          }
        } else if (type.includes('array')) {
          return {
            START: "[",
            END: "]",
          }
        } else {
          return {
            START: "'",
            END: "'",
          }
        }
      }


      const getComponentProps = () => {
        let componentProps = ""
        if (hasComponentProps) {
          get(el, 'node.componentProps', []).map(el => {
            const wrapper = getWrapper(el.propTypeProp)
            if (!isEmpty(el.val)) componentProps += 
              `\n${el.title}=${wrapper.START}${el.val.trim()}${wrapper.END}\n`
          })
        }
        return componentProps
      }

      if (theTitle !== 'Text') {
        code += `<${theTitle}${getComponentProps()}${closeTag}`
      } else {
        if (!isEmpty(el.node.componentProps[0].val)) code += el.node.componentProps[0].val
      }

      // set the parent data
      if (hasParent) {
        const currentParentId = el.parentNode.id
        const currentParent = tree.filter(el => el.node.id === currentParentId)
        const currentParentLastChild =
          el.parentNode.children.length > 1
            ? el.parentNode.children[el.parentNode.children.length - 1]
            : el.parentNode.children[0]

        // check if current element is the last child
        if (currentId === currentParentLastChild.uniqId && !hasChildren && parentsList.length > 1) {
          code += `</ ${parentsList[parentsList.length - 1]}>`
          parentsList.pop()
        }

        // check next elemen path
        if (
          !isEmpty(nextEl) &&
          currentParent[0].path.length > nextEl.path.length
        ) {
          code += `</ ${parentsList[parentsList.length - 1]}>`
          parentsList.pop()
        }
      }

      elIdx++
      return code
    })

    // close remaining parents
    if (parentsList.length) {
      reverse(parentsList).map(el => {
        code += `</ ${el}>`
      })
    }
    return code
  }

  code += prepareTree(flatTree)

  return code
}

export const getFlatForms = files => {
  let flatForms = []
  files.map(file => {
    file.fileForms.map(form => {
      flatForms.push(form)
    })
  })
  return flatForms
}