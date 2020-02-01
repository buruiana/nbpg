import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import logger from "redux-logger"
import rootReducer from "./reducer"
import rootSaga from "./saga"

export default function configureAppStore(preloadedState) {
  const monitor = window["__SAGA_TIMELINE__"]
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor: monitor })

  const store = configureStore({
    reducer: rootReducer,
    middleware: [logger, sagaMiddleware, ...getDefaultMiddleware()],
    preloadedState
  })

  sagaMiddleware.run(rootSaga)

  return store
}
