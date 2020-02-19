import isEmpty from 'lodash/isEmpty';
import { walk, changeNodeAtPath } from 'react-sortable-tree';
import get from 'lodash/get';
import uniqueId from 'lodash/uniqueId';

export const getFlatForms = files => {
  let flatForms = []
  files.map(file => {
    file.fileForms.map(form => {
      flatForms.push(form)
    })
  })

  return flatForms
}


export const fillNodeData = (treeData, providers) => {
  walk({
    treeData: treeData,
    getNodeKey: ({ treeIndex: number }) => number,
    callback: rowInfo => {
      let node = {
        ...rowInfo.node,
      };
      node.uniqId = uniqueId();
      node.hasChildren = !isEmpty(node.children);
      const hasComponentPropsVals = get(node, 'componentProps', []).filter(el => el.val);
      node.hasComponentPropsVals = !isEmpty(hasComponentPropsVals);
      node.providerPath = get(providers.filter(provider => provider.name === node.provider), '[0].path', '');

      treeData = changeNodeAtPath({
        treeData: treeData,
        path: rowInfo.path,
        newNode: node,
        getNodeKey: ({ treeIndex }) => treeIndex,
        ignoreCollapsed: false
      });
    },
    ignoreCollapsed: false
  });

  return treeData;
}