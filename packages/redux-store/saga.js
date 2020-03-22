import backendSaga from '@bpgen/services/backendService/saga'
import collectionSaga from '@bpgen/services/collectionService/saga'
import projectSaga from '@bpgen/services/projectService/saga'
import codeGenSaga from '@bpgen/services/codeGenService/saga'
import { all, fork } from 'redux-saga/effects'

export default function* sagas() {
  yield all(
    [
      backendSaga,
      collectionSaga,
      projectSaga,
      codeGenSaga,
    ].map(saga => fork(saga))
  )
}
