import React from "react"
import {
  projectSelectors,
  addModal,
  collectionSelectors,
  searchSelectors,
  setError,
  generateCode,
  setProjectTree,
} from '@bpgen/services'
import { useDispatch, useSelector } from 'react-redux'
import SortableTree, {
  removeNodeAtPath,
  getVisibleNodeCount
} from "react-sortable-tree"

import InfoIcon from '@material-ui/icons/Info'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import StorageIcon from '@material-ui/icons/Storage'
import "react-sortable-tree/style.css"

import get from 'lodash/get'
import sortBy from 'lodash/sortBy'


const externalNodeType = "yourNodeType"
const shouldCopyOnOutsideDrop = true
const getNodeKey = ({ treeIndex }) => treeIndex

const SortTree = () => {
  const dispatch = useDispatch()
  const collections = useSelector(collectionSelectors.collectionSelector) || []
  const components = get(collections.filter(e => e.title === 'components'), '[0].data', [])
  const searchData = useSelector(searchSelectors.searchSelector) || {}

  const projectTree = useSelector(projectSelectors.projectTreeSelector) || []
  const currentProject = useSelector(projectSelectors.currentProjectSelector) || []

  const filteredDefaultTree = () => {
    const filteredComponents = components.filter(el => {
      if (get(searchData, 'keyword', '')) {
        return (el.title.toLowerCase().indexOf(searchData.keyword.toLowerCase()) !== -1) &&
          (
            get(searchData, 'provider', el.provider) === el.provider ||
            get(searchData, 'provider', 'all') === 'all'
          )
          &&
          (
            get(searchData, 'techno', el.techno) === el.techno ||
            get(searchData, 'techno', 'all') === 'all'
          )
      }
      return (
        (
          get(searchData, 'provider', el.provider) === el.provider ||
          get(searchData, 'provider', 'all') === 'all'
        )
        &&
        (
          get(searchData, 'techno', el.techno) === el.techno ||
          get(searchData, 'techno', 'all') === 'all'
        )
      )
    })

    return sortBy(filteredComponents, el => el.title)
  }

  const count =
    getVisibleNodeCount({ treeData: filteredDefaultTree() }) > 1
      ? getVisibleNodeCount({ treeData: filteredDefaultTree() })
      : 400

  const onChange = treeData => {
    try {
      if (treeData.length === 1) {
        dispatch(setProjectTree(treeData))
        dispatch(generateCode({ currentProject }))
      } else {
        dispatch(setError("Tree length should be 1"))
      }
    } catch (error) {
      dispatch(setError(error))
    }
  }

  const remove = path => {
    const newTree =
      removeNodeAtPath({
        treeData: projectTree,
        path,
        getNodeKey
      })

    dispatch(setProjectTree(newTree))
    dispatch(generateCode({ currentProject }))
  }

  const openModal = (type, node, path) => dispatch(addModal({ type, data: { node, path } }))

  return (
    <div className='row'>
      <div className='column50'
        style={{
          height: count * 10 + 100,
          float: 'left',
          minHeight: '800'
        }}
      >
        <SortableTree
          treeData={filteredDefaultTree()}
          onChange={() => console.log("changed")}
          dndType={externalNodeType}
          shouldCopyOnOutsideDrop={shouldCopyOnOutsideDrop}
          generateNodeProps={({ node, path }) => ({
            buttons: [
              <InfoIcon
                color='primary'
                className='generic_link'
                onClick={() => openModal('component_info', node, path)
              }/>
            ]
          })}
        />
      </div>
      <div className='column50'>
        <SortableTree
          treeData={projectTree}
          onChange={onChange}
          dndType={externalNodeType}
          shouldCopyOnOutsideDrop={shouldCopyOnOutsideDrop}
          getNodeKey={getNodeKey}
          generateNodeProps={({ node, path }) => ({
            buttons: [
              <RemoveCircleIcon
                color='primary'
                onClick={() => remove(path)}
              />,
              <StorageIcon
                color='primary'
                className='generic_link'
                onClick={() =>
                  openModal('component_props', node, path)
                }
              />
            ]
          })}
        />
      </div>
    </div>
  )
}

export default SortTree
