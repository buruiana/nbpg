import axios from 'axios'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { setError } from '@bpgen/services'
import { setCode } from '../codeGenService'

const callBackend = (type, data) => {
  return axios.post(`http://localhost:5000/api/${type}`, { data })
}

const callBackendDelete = data => {
  return axios.delete(`http://localhost:5000/api/delete`, { data })
}

const prettify = (code, parser) => {
  return axios.post('http://localhost:5000/api/prettify', code, parser)
}

export function* watchPrettifyCode(code, parser = 'babel') {
  try {
    const res = yield prettify({ code, parser })
    yield put(setCode(res.data))
    return res.data
  } catch (error) {
    yield put(setError(error.message))
  }
}
export function* watchCreate({ payload }) {
  if (!payload) return
  try {
    const res = yield callBackend('create', payload)
  } catch (error) {
    yield put(setError(error.message))
  }
}

export function* watchUpdate({ payload }) {
  if (!{ payload }) return
  try {
    const res = yield callBackend('update', payload)
    return res
  } catch (error) {
    yield put(setError(error.message))
  }
}

export function* watchRead({ payload }) {
  try {
    const res = yield callBackend('read', payload)
    return res.data
  } catch (error) {
    yield put(setError(error.message))
  }
}

export function* watchDelete({ payload }) {
  if (!payload) return
  try {
    const res = yield callBackendDelete(payload)
    return res
  } catch (error) {
    yield put(setError(error.message))
  }
}

export default function* rootSaga() {
  yield takeLatest('backend/prettifyCode', watchPrettifyCode)
  yield takeLatest('backend/createItem', watchCreate)
  yield takeEvery('backend/readItem', watchRead)
  yield takeLatest('backend/updateItem', watchUpdate)
  yield takeLatest('backend/deleteItem', watchDelete)
}
