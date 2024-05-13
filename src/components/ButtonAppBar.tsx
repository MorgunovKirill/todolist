import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import LinearProgress from "@mui/material/LinearProgress"
import { useAppDispatch, useAppSelector } from "../state/store"
import { appStatusSelector } from "../state/selectors/appStatusSelector"
import { isLoggedSelector } from "../state/selectors/isLoggedSelector"
import { logout } from "../state/auth-reducer"

export default function ButtonAppBar() {
  const dispatch = useAppDispatch()
  const status = useAppSelector(appStatusSelector)
  const isLoggedIn = useAppSelector(isLoggedSelector)

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {isLoggedIn ? (
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit">Login</Button>
          )}
        </Toolbar>
        {status === "loading" && <LinearProgress />}
      </AppBar>
    </Box>
  )
}
