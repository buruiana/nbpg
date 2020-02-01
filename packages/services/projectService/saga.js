import axios from 'axios'
import { setError, setInfo } from '@bpgen/services'
import { call, put, takeLatest } from 'redux-saga/effects'

const exportFiles = data => {
  return axios.post('http://localhost:5000/api/exportFiles', data)
};

export function* watchExportFiles(action) {
  try {
    yield call(exportFiles, action.payload.data)
    yield put(setInfo('Files have been successfully exported.'))
  } catch (error) {
    yield put(setError(error.message))
  }

}

export default function* rootSaga() {
  yield takeLatest('project/exportFiles', watchExportFiles)
}
