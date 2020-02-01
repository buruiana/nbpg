import axios from 'axios'
import { setError, setCollections } from '@bpgen/services'
import { call, put, takeLatest } from 'redux-saga/effects'

const callBackend = (type, data) => {
  return axios.post(`http://localhost:5000/api/${type}`, { data })
}

export function* watchGetCollections() {
  try {
    const res = yield callBackend('read', {type: 'collections'})

    yield put(setCollections(res.data))
  } catch (error) {
    yield put(setError(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('collection/getCollections', watchGetCollections)
}
