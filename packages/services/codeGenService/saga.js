import { put, takeLatest, select, call } from "redux-saga/effects"
import isEmpty from "lodash/isEmpty"
import get from "lodash/get"
import { prettifyCode, setError, setCode } from '@bpgen/services'
import { executeCodeGeneration } from "./helper"

export function* watchGenerateCode({ payload }) {
  const { currentTemplate, customForms } = payload

  if (isEmpty(currentTemplate)) {
    yield put(setError('Template not provided for code generation'))
  }

  try {
    yield put(
      setCode(
        prettifyCode(
          executeCodeGeneration(currentTemplate, customForms)
        )
      )
    )

    //yield put(setCode(code.payload))
  } catch (error) {
    yield put(setError(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('codegen/generateCode', watchGenerateCode)
}
