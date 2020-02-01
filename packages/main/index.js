import NavBar from "@bpgen/layouts/components/NavBar"
import CustomNavBar from "@bpgen/layouts/components/CustomNavBar"
import CustomAlert from "@bpgen/layouts/components/CustomAlert"
import GenericModal from "@bpgen/layouts/screens/GenericModal"
import routes from '@bpgen/reach-router'
import store from "@bpgen/redux-store"
import Container from "@material-ui/core/Container"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import "babel-polyfill"
import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import './styles.scss'

import { getCollections } from '@bpgen/services'

const theme = createMuiTheme({})
const bpGenStore = store()

// init data
bpGenStore.dispatch(getCollections())

render(
  <Provider store={bpGenStore}>
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <div className='nav'>
          <NavBar />
        </div>
        <CustomAlert />
        {routes}
        <GenericModal />
      </Container>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
)
