import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Cookies from 'cookies'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const profile = ({ user }) => {
  return (
    <>
      <Container maxWidth="lg">
        <Box m={3} pt={3}>
          {user &&
            <Grid container spacing={2} alignItems="center" justifyContent="center" direction="column">
              <Grid item xs={12}>
                <h1 style={{ textAlign: 'center' }}>Profile</h1>
              </Grid>
              <Grid item xs={12}>
                <h3 style={{ textAlign: 'center' }}>{user.user_id}</h3>
              </Grid>
              <Grid item xs={12}>
                <h3 style={{ textAlign: 'center' }}>{user.username}</h3>
              </Grid>
              <Grid item xs={12}>
                <h3 style={{ textAlign: 'center' }}>{user.password}</h3>
              </Grid>
              <Grid item xs={12}>
                <h3 style={{ textAlign: 'center' }}>{user.email}</h3>
              </Grid>
            </Grid>}
        </Box>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {

  // get user id from cookies
  const cookies = new Cookies(context.req, context.res)
  const userID = cookies.get('user_id')

  const url = process.env.NEXT_PUBLIC_AWS_API + "/user-service/v1/users/" + userID;
  const res = await fetch(url);
  const user = await res.json()

  return {
    props: { user },
  }
}

export default profile;