import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Link from "next/link"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Router from 'next/router'
import cookie from 'cookie-cutter'



const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



const loginUser = async event => {
  event.preventDefault()

  const username = event.target.username.value;
  const password = event.target.password.value;

  console.log(username + "," + password);

  const url = process.env.NEXT_PUBLIC_AWS_API + "/user-service/v1/users/login";
  const res = await fetch(url, {
    body: JSON.stringify({
      username: username,
      password: password
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST'
  })

  if(res.status == 200) {

    const result = await res.json();
    console.log(result);

    if (typeof window !== "undefined") {
      cookie.set('user_id', result.user_id);
      Router.push('/');
    }
    
  } else {
    console.log(res.status);
  }

  // result.user => 'Ada Lovelace'
}

const login = () => {
  return (
    <div>
      <Container maxWidth="lg">
        <Box m={3} pt={3}>
          <Item>
            <h1 style={{ textAlign: 'center' }}>Login page</h1>
            <form onSubmit={loginUser}>
              <Grid container spacing={2} alignItems="center" justifyContent="center" direction="column">
                <Grid item xs={12}>
                  <TextField id="username" label="username" variant="standard" />
                </Grid>
                <Grid item xs={12}>
                  <TextField id="password" label="password" type="password" variant="standard" />
                </Grid>
                <Grid item xs={12}>
                  <Button type='submit' variant="outlined">Login</Button>
                </Grid>
              </Grid>
            </form>
          </Item>
        </Box>
      </Container>
    </div>
  )
}

export default login;