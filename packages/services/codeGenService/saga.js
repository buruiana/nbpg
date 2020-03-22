import { put, takeLatest, select } from 'redux-saga/effects'
import isEmpty from 'lodash/isEmpty'
import { prettifyCode, setError } from '@bpgen/services'
import { executeCodeGeneration } from './helper'

export function* watchGenerateCode() {
  const currentProject = (yield select()).projectServiceReducer.currentProject

  if (isEmpty(currentProject.currentTemplate)) {
    yield put(setError('Template not provided for code generation'))
  }

  try {
    const temp = executeCodeGeneration(currentProject)
    yield put(prettifyCode(temp))
  } catch (error) {
    yield put(setError(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('codegen/generateCode', watchGenerateCode)
}
