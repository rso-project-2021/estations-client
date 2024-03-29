import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from "next/link"
import Router from 'next/router'
import cookie from 'cookie-cutter'

const logout = async event => {
  event.preventDefault()
  cookie.set('user_id');
  Router.push('/login')
}

const Nav = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar >
          <Link href="/">
            <Button color="inherit">Home</Button>
          </Link>
          <Link href="/reservations">
            <Button color="inherit">Reservations</Button>
          </Link>
          <Link href="/profile">
            <Button color="inherit">Profile</Button>
          </Link>
          <Link href="/login">
            <Button onClick={logout} color="inherit">Logout</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Nav;
