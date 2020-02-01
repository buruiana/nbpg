import AppBar from "@material-ui/core/AppBar"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import React from "react"
import { navigate } from "@reach/router"
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import '../styles.scss'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const NavBar = () => {
  const go = route => navigate(route)
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            bpGen
          </Typography>
          <Button color="inherit" onClick={() => go('/editor')}>Editor</Button>
          <Button color="inherit" onClick={() => go('/list')}>Collections</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
